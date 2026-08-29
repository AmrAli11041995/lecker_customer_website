import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CartItem } from '../../models/cart.model';
import { QuantitySelectorComponent } from '../../../../shared/components/quantity-selector/quantity-selector.component';
import { FallbackImageDirective } from '../../../../shared/directives/fallback-image.directive';

@Component({
  selector: 'app-cart-table',
  standalone: true,
  imports: [CommonModule, QuantitySelectorComponent, TranslateModule, FallbackImageDirective],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.scss'
})
export class CartTableComponent {
  @Input() cartItems: CartItem[] = [];
  @Output() quantityChange = new EventEmitter<{ itemId: number, quantity: number }>();
  @Output() removeItem = new EventEmitter<number>();
  @Output() returnToShop = new EventEmitter<void>();
  @Output() updateCart = new EventEmitter<void>();

  constructor() {
    ;
    let val = this.cartItems;
  }

  onQuantityChange(itemId: number, quantity: number): void {
    this.quantityChange.emit({ itemId, quantity });
  }

  onRemoveItem(itemId: number): void {
    this.removeItem.emit(itemId);
  }

  onReturnToShop(): void {
    this.returnToShop.emit();
  }

  onUpdateCart(): void {
    this.updateCart.emit();
  }
}
