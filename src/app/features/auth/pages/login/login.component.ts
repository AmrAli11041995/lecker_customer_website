import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // This is just UI - no actual authentication
    console.log('Login attempted with:', {
      email: this.email,
      password: '***',
      rememberMe: this.rememberMe
    });
    
    // You can add a toast notification here
    alert('Login UI only - no authentication implemented');
  }
}
