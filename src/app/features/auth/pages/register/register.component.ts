import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  currentStep: number = 1;
  showPassword: boolean = false;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  nextStep() {
    if (this.currentStep === 1) {
      // Validate step 1
      if (!this.formData.firstName || !this.formData.lastName ||
        !this.formData.email || !this.formData.phone || !this.formData.country) {
        alert('Please fill in all fields');
        return;
      }
      this.currentStep = 2;
    }
  }

  previousStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  onSubmit() {
    // Password validation
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.formData.agreeTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    // This is just UI - no actual registration
    console.log('Registration attempted with:', {
      ...this.formData,
      password: '***',
      confirmPassword: '***'
    });

    alert('Registration UI only - no backend integration');
  }
}
