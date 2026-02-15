import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { CartTableComponent } from '../../components/cart-table/cart-table.component';
import { CartTotalComponent } from '../../components/cart-total/cart-total.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartTableComponent, CartTotalComponent, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
    itemCount: 0
  };

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cart => {
        ;
        this.cart = cart;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQuantityChange(event: { itemId: number, quantity: number }): void {
    this.cartService.updateQuantity(event.itemId, event.quantity);
  }

  onRemoveItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  onReturnToShop(): void {
    this.router.navigate(['/products']);
  }

  onUpdateCart(): void {
    // Cart is automatically updated via the service
    console.log('Cart updated');
  }


  onProceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
