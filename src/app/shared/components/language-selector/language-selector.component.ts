import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation-helper.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  currentLang: string ;
  isOpen: boolean = false;

  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' }
  ];
constructor( private translate: TranslationService
    
  ) {
    this.currentLang =   this.translate.getCurrentLanguage();
  }
  
  switchLanguage(lang: string) {
    this.translate.switchLanguage();
    this.currentLang = this.translate.getCurrentLanguage();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

   // Language dropdown methods
  // toggleLanguageDropdown(event: Event) {
  //   event.preventDefault();
  //   this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  //   this.isShopDropdownOpen = false; // Close other dropdowns
  // }

  // selectLanguage(language: string) {
  //   this.selectedLanguage = language;
  //   this.isLanguageDropdownOpen = false;
  //   const langCode = language === 'DE' ? 'de' : 'en';
  //   this.translate.use(langCode);
  // }

}
