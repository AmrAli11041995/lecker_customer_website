import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule],
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
      this.posts = res.data;
      if(this.posts.length > 0){
        this.bannerPost = this.posts[0];
        let now = new Date();
        let endDate = new Date(this.bannerPost?.expirationDate);
        if(now < endDate){
          this.countdown.days = endDate.getDate() - now.getDate();
          this.countdown.hours = endDate.getHours() - now.getHours();
          this.countdown.minutes = endDate.getMinutes() - now.getMinutes();
          this.countdown.seconds = endDate.getSeconds() - now.getSeconds();
        }
      }
    });
  }
}
