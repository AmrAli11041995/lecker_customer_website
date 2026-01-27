import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  currentLang: string = 'en';
  isOpen: boolean = false;

  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' }
  ];

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
