import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../features/products/models/product.model';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit, OnChanges {
  fileBaseURL = environment.fileBaseURL;
  @Input() product: Product | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Product>();
  @Output() addToWishlist = new EventEmitter<Product>();

  selectedImageIndex: number = 0;
  quantity: number = 1;
  productImages: string[] = [];
  
  // Touch/swipe functionality
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchEndX: number = 0;
  private touchEndY: number = 0;
  private minSwipeDistance: number = 50;

  ngOnInit() {
    if (this.product) {
      this.productImages = this.generateProductImages();
    }
  }

  ngOnChanges() {
    if (this.product) {
      this.productImages = this.generateProductImages();
      this.selectedImageIndex = 0;
      this.quantity = 1;
    }
  }

  generateProductImages(): string[] {
    if (!this.product) return [];
    
    // Generate multiple images for the gallery (using the same image for now)
    return [
      this.product.imageUrl,
      this.product.imageUrl,
      this.product.imageUrl,
      this.product.imageUrl
    ];
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onAddToCart() {
    if (this.product) {
      this.product.orderedQuantity = this.quantity;
      this.addToCart.emit(this.product);
    }
  }

  onAddToWishlist() {
    if (this.product) {
      this.addToWishlist.emit(this.product);
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onCloseModal();
    }
  }

  // Navigation methods
  nextImage() {
    if (this.selectedImageIndex < this.productImages.length - 1) {
      this.selectedImageIndex++;
    }
  }

  previousImage() {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }

  // Touch/swipe methods
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    // Prevent default to avoid scrolling while swiping
    event.preventDefault();
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
    
    this.handleSwipe();
  }

  private handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    
    // Only process horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - go to previous image
        this.previousImage();
      } else {
        // Swipe left - go to next image
        this.nextImage();
      }
    }
  }
}
