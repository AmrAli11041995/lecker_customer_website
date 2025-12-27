import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../features/products/models/product.model';
import { WishlistService } from '../../services/wishlist.service';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  
  @Output() addToCart = new EventEmitter<Product>();
  @Output() addToWishlist = new EventEmitter<Product>();
  @Output() viewProduct = new EventEmitter<Product>();
// imageEndPoint :string = "https://localhost:44311";
  fileBaseURL = environment.fileBaseURL;
  constructor(
    private wishlist: WishlistService,
    private toast: ToastService
  ) {}

  onAddToCart(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.addToCart.emit(this.product);
  }

  onAddToWishlist(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const wasInWishlist = this.wishlist.isInWishlist(this.product.id);
    this.wishlist.toggle(this.product);
    
    if (wasInWishlist) {
      this.toast.showInfo(`${this.product.name} removed from wishlist`);
    } else {
      this.toast.showSuccess(`${this.product.name} added to wishlist!`);
    }
    
    this.addToWishlist.emit(this.product);
  }

  onViewProduct(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.viewProduct.emit(this.product);
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  isInWishlist(): boolean {
    return this.wishlist.isInWishlist(this.product.id);
  }
}
