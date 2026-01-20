import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return this.translate.instant('FORM_ERRORS.REQUIRED', { field: this.getFieldLabel(fieldName) });
      }
      if (field.errors['email']) {
        return this.translate.instant('FORM_ERRORS.EMAIL');
      }
      if (field.errors['minlength']) {
        return this.translate.instant('FORM_ERRORS.MINLENGTH', { field: this.getFieldLabel(fieldName), length: field.errors['minlength'].requiredLength });
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.toastService.showSuccess(this.translate.instant('CONTACT.SUCCESS'));
        this.contactForm.reset();
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
      this.toastService.showError('Please fill in all required fields correctly');
    }
  }
}
