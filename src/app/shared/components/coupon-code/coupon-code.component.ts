import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coupon-code',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './coupon-code.component.html',
  styleUrl: './coupon-code.component.scss'
})
export class CouponCodeComponent {
  constructor(private translate: TranslateService) {}
  couponCode: string = '';
  isApplied: boolean = false;
  errorMessage: string = '';

  @Output() couponApplied = new EventEmitter<string>();

  onApplyCoupon(): void {
    if (!this.couponCode.trim()) {
      this.errorMessage = 'COUPON_CODE.ERROR.REQUIRED';
      return;
    }

    // Dummy validation - in real app, this would call a service
    const validCoupons = ['SAVE10', 'FREESHIP', 'WELCOME20'];
    
    if (validCoupons.includes(this.couponCode.toUpperCase())) {
      this.isApplied = true;
      this.errorMessage = '';
      this.couponApplied.emit(this.couponCode);
    } else {
      this.errorMessage = 'COUPON_CODE.ERROR.INVALID';
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
