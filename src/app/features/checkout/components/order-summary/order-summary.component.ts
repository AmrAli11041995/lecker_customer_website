import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OrderSummary, OrderItem, PaymentMethod } from '../../models/checkout.model';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  @Input() orderSummary!: OrderSummary;
  @Input() selectedPaymentMethod: string = 'cash';
  @Output() paymentMethodChange = new EventEmitter<string>();
  @Output() placeOrder = new EventEmitter<void>();
  @Output() couponApplied = new EventEmitter<string>();

  constructor(private translate: TranslateService) {}

  paymentMethods: PaymentMethod[] = [
    { type: 'cash', label: 'Cash on Delivery' },
    { type: 'other', label: 'Other' }
  ];

  couponCode: string = '';

  onPaymentMethodChange(method: string): void {
    this.selectedPaymentMethod = method;
    this.paymentMethodChange.emit(method);
  }

  onPlaceOrder(): void {
    this.placeOrder.emit();
  }

  onApplyCoupon(): void {
    if (this.couponCode.trim()) {
      this.couponApplied.emit(this.couponCode.trim());
      this.couponCode = '';
    }
  }

  getShippingText(): string {
    return this.orderSummary.shipping === 0 ? this.translate.instant('ORDER_SUMMARY.FREE') : `${this.orderSummary.shipping.toFixed(2)}`;
  }
}
