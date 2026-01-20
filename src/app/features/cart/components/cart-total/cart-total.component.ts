import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss'
})
export class CartTotalComponent {
  constructor(private translate: TranslateService) {}
  @Input() subtotal: number = 0;
  @Input() shipping: number = 0;
  @Input() total: number = 0;
  @Output() proceedToCheckout = new EventEmitter<void>();

  onProceedToCheckout(): void {
    this.proceedToCheckout.emit();
  }

  getShippingText(): string {
    return this.shipping === 0 ? this.translate.instant('CART_TOTAL.FREE') : `${this.shipping.toFixed(2)}`;
  }
}
