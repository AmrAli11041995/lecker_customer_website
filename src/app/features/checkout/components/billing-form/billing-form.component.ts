import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BillingInfo } from '../../models/checkout.model';

@Component({
  selector: 'app-billing-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './billing-form.component.html',
  styleUrl: './billing-form.component.scss'
})
export class BillingFormComponent implements OnInit {
  billingForm!: FormGroup;
  
  @Output() billingInfoChange = new EventEmitter<BillingInfo>();

  countries = [
    'Select Country',
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Netherlands',
    'Belgium',
    'Switzerland',
    'Austria'
  ];

  cities = [
    'Select City',
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose'
  ];

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormSubscription();
  }

  private initializeForm(): void {
    this.billingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      companyName: [''],
      streetAddress: ['', [Validators.required, Validators.minLength(5)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      shipToDifferentAddress: [false],
      orderNotes: ['']
    });
  }

  private setupFormSubscription(): void {
    this.billingForm.valueChanges.subscribe(value => {
      if (this.billingForm.valid) {
        this.billingInfoChange.emit(value);
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.billingForm.get(fieldName);
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
      if (field.errors['pattern']) {
        return this.translate.instant('BILLING.ERROR.PHONE_PATTERN');
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      companyName: 'Company Name',
      streetAddress: 'Street Address',
      country: 'Country',
      city: 'City',
      email: 'Email',
      phone: 'Phone'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.billingForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  onSubmit(): void {
    if (this.billingForm.valid) {
      this.billingInfoChange.emit(this.billingForm.value);
    } else {
      this.billingForm.markAllAsTouched();
    }
  }
}
