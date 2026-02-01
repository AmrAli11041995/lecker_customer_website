import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  countdown = {
    days: 0,
    hours: 2,
    minutes: 18,
    seconds: 46
  };
  
  private countdownInterval: any;
  fileBaseURL = environment.fileBaseURL;
  constructor(private postService: PostService,private router: Router){

}
  ngOnInit() {
    this.startCountdown();
    this.getPosts();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown.seconds > 0) {
        this.countdown.seconds--;
      } else if (this.countdown.minutes > 0) {
        this.countdown.minutes--;
        this.countdown.seconds = 59;
      } else if (this.countdown.hours > 0) {
        this.countdown.hours--;
        this.countdown.minutes = 59;
        this.countdown.seconds = 59;
      } else if (this.countdown.days > 0) {
        this.countdown.days--;
        this.countdown.hours = 23;
        this.countdown.minutes = 59;
        this.countdown.seconds = 59;
      }
    }, 1000);
  }

  onShopNow() {
      this.router.navigate(['/products']);

    // TODO: Navigate to products or implement shop now functionality
    console.log('Shop Now clicked');
  }

  posts=[];
  bannerPost: any={}
  getPosts(){
    this.postService.GetPosts().subscribe((res) => {
      console.log(res);
      debugger;
      this.posts = res.data;
      if(this.posts.length > 0){
        let bannerPosttemp:any = this.posts[0];
       console.log(this.bannerPost);
        let now = new Date();
        let endDate = new Date(bannerPosttemp?.expirationDate);
        if(now < endDate){
          let diff = this.getDateDiff(now, endDate);
          this.bannerPost = this.posts[0];
          this.countdown.seconds = diff.seconds;  
          this.countdown.minutes = diff.minutes;
          this.countdown.hours = diff.hours;
          this.countdown.days = diff.days;
        } 
      }
    });
  }
  getDateDiff(start: Date, end: Date) {
  const diffMs = Math.abs(end.getTime() - start.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours   = Math.floor(totalMinutes / 60);
  const days         = Math.floor(totalHours / 24);

  return {
    days,
    hours: totalHours % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60
  };
}
}
