import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
// import { LanguageDirection } from '../enums/language-direction';
// import { LanguageName } from '../enums/language-name.enum';
// import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
//   private currentLang: Language = {
//     Name: LanguageName.Arabic,
//     Direction: LanguageDirection.RightToLeft,
//   };
  private currentLang: string = 'de';
  // Observable Source
  private languageChangeSource = new Subject<string>();
  languageChangeItem = new BehaviorSubject<string>('de');

  // Observable Stream
  languageChange = this.languageChangeSource.asObservable();

  constructor(private translateService: TranslateService) { }

  initializeLanguage() {
    debugger;
    if (
      !localStorage.getItem('lang') ||
      localStorage.getItem('lang') === null
    ) {

      localStorage.setItem('lang', this.currentLang);
    }
    const langName =
      localStorage.getItem('lang') !== null
        ? localStorage.getItem('lang')
        : this.currentLang;

    this.currentLang = langName as string;
    // this.currentLang.Direction =
    //   this.currentLang.Name == LanguageName.English
    //     ? LanguageDirection.LeftToRight
    //     : LanguageDirection.RightToLeft;

    this.translateService.use(this.currentLang);
    document
      .getElementsByTagName('html')[0]
      .setAttribute('dir', 'ltr');
    //   .setAttribute('dir', this.currentLang.Direction);
      document
      .getElementsByTagName('html')[0]
      .setAttribute('lang', this.currentLang);

    this.languageChangeItem.next(this.currentLang);
    this.languageChangeSource.next(this.currentLang);
    //this.setDynamicClass();
  }

  // setDynamicClass(){
  //   if(this.currentLang.Name == LanguageName.English){
  //     setTimeout(() => {

  //       let mm = document.getElementsByClassName('content-body')[0];
  //       if(mm !== null && mm !== undefined){
  //         mm.className = "content-body content-body-en";
  //       }
  //     }, 100);
  //   }
  //   else{
  //     setTimeout(() => {

  //       let mm = document.getElementsByClassName('content-body')[0];
  //       if(mm !== null && mm !== undefined){
  //         mm.className = "content-body";
  //       }
  //     }, 100);
  //   }
  // }

  switchLanguage() {
    if (this.currentLang.toLocaleLowerCase() == 'en') {
      this.currentLang = 'de';
    //   this.currentLang.Direction = LanguageDirection.LeftToRight;
    } else {
      this.currentLang = 'en';
    //   this.currentLang.Direction = LanguageDirection.RightToLeft;
    }

    localStorage.setItem('lang', this.currentLang);
    document
      .getElementsByTagName('html')[0]
      .setAttribute('dir', 'ltr');
      document
      .getElementsByTagName('html')[0]
      .setAttribute('lang', this.currentLang);

    this.translateService.use(this.currentLang);
    this.languageChangeItem.next(this.currentLang);
    this.languageChangeSource.next(this.currentLang);
    //this.setDynamicClass();
    location.reload();
  }

//   instant(key: string,params =null): any {
//     return this.translateService.instant(key,params);
//   }

  getCurrentLanguage(): string {
//   getCurrentLanguage(): Language {
    const langName =
      localStorage.getItem('lang') !== null
        ? localStorage.getItem('lang')
        : this.currentLang;

    this.currentLang = langName as string;
    // this.currentLang.Direction =
    //   this.currentLang.Name == LanguageName.English
    //     ? LanguageDirection.LeftToRight
    //     : LanguageDirection.RightToLeft;

    return this.currentLang;
  }
}
