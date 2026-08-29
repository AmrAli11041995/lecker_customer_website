import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OrderSummary, OrderItem, PaymentMethod } from '../../models/checkout.model';
import { FallbackImageDirective } from '../../../../shared/directives/fallback-image.directive';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { CartService } from '../../../cart/services/cart.service';
import { ApiResponse } from '../../../../shared/models/apiResponse.model';
import { Copoun } from '../../../cart/models/copoun.model';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, FallbackImageDirective, ToastComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnInit {
  @Input() orderSummary!: OrderSummary;
  @Input() selectedPaymentMethod: string = 'cash';
  @Input() appliedCopoun: boolean = false;
  @Output() paymentMethodChange = new EventEmitter<string>();
  @Output() placeOrder = new EventEmitter<void>();
  @Output() couponApplied = new EventEmitter<string>();
  @Output() clearCoupon = new EventEmitter<string>();

  constructor(private translate: TranslateService, private toastService: ToastService, private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.orderSummary)
  }

  paymentMethods: PaymentMethod[] = [
    { type: 'cash', label: 'Cash on Delivery' },
    // { type: 'other', label: 'Other' }
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
        // this.couponCode = '';
      }
  }

  onCLearCopoun() {
    this.couponCode = '';
    this.clearCoupon.emit(this.couponCode);
  }

  getShippingText(): string {
    return this.orderSummary.shipping === 0 ? this.translate.instant('ORDER_SUMMARY.FREE') : `${this.orderSummary.shipping.toFixed(2)}`;
  }
}
