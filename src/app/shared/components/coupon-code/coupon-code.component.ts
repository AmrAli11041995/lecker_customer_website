import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coupon-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupon-code.component.html',
  styleUrl: './coupon-code.component.scss'
})
export class CouponCodeComponent {
  couponCode: string = '';
  isApplied: boolean = false;
  errorMessage: string = '';

  @Output() couponApplied = new EventEmitter<string>();

  onApplyCoupon(): void {
    if (!this.couponCode.trim()) {
      this.errorMessage = 'Please enter a coupon code';
      return;
    }

    // Dummy validation - in real app, this would call a service
    const validCoupons = ['SAVE10', 'FREESHIP', 'WELCOME20'];
    
    if (validCoupons.includes(this.couponCode.toUpperCase())) {
      this.isApplied = true;
      this.errorMessage = '';
      this.couponApplied.emit(this.couponCode);
    } else {
      this.errorMessage = 'Invalid coupon code';
      this.isApplied = false;
    }
  }

  onRemoveCoupon(): void {
    this.couponCode = '';
    this.isApplied = false;
    this.errorMessage = '';
    this.couponApplied.emit('');
  }
}
