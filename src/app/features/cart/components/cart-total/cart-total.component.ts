import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss'
})
export class CartTotalComponent {
  @Input() subtotal: number = 0;
  @Input() shipping: number = 0;
  @Input() total: number = 0;
  @Output() proceedToCheckout = new EventEmitter<void>();

  onProceedToCheckout(): void {
    this.proceedToCheckout.emit();
  }

  getShippingText(): string {
    return this.shipping === 0 ? 'Free' : `$${this.shipping.toFixed(2)}`;
  }
}
