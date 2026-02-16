import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './shared/services/translation-helper.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SpinnerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'lecker-customer';
  showHeaderFooter = true;

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {
    // translate.addLangs(['en', 'de']);
    // translate.setDefaultLang('en');
    //  const browserLang = translate.getBrowserLang();
    // translate.use(browserLang?.startsWith('de') ? 'de' : 'en');

  }

  ngOnInit() {
    this.translationService.initializeLanguage();
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Hide header/footer on auth routes
        this.showHeaderFooter = !event.urlAfterRedirects.includes('/auth');
      });
  }
  // changeLanguage(lang: 'en' | 'de') {
  //   this.translate.use(lang);
  // }
}
