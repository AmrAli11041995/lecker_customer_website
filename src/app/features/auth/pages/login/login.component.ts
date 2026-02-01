import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';

import { LanguageSelectorComponent } from '../../../../shared/components/language-selector/language-selector.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule, LanguageSelectorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  submitted = false;
  constructor(private fb: FormBuilder, private translate: TranslateService, private authService: AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      // rememberMe: [false]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.status === true) {
            console.log(res);
            localStorage.setItem('token', res.data);
            this.router.navigate(['/home']);
          }
          else {
            this.toastService.showError(`Login failed!`);
          }
          // alert(this.translate.instant('LOGIN.UI_ONLY_ALERT'));
        },
        error: (err) => {
          console.log(err);
          alert(this.translate.instant('LOGIN.UI_ONLY_ALERT'));
        }
      });
      // const { email, rememberMe } = this.loginForm.value;
      // console.log('Login attempted with:', { email, password: '***', rememberMe });
      // alert(this.translate.instant('LOGIN.UI_ONLY_ALERT'));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
}
