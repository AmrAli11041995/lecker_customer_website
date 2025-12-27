import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ToastComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  constructor(public wishlist: WishlistService) {}

  onRemove(productId: number) {
    this.wishlist.remove(productId);
  }
}


