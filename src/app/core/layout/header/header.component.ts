import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../features/cart/services/cart.service';
import { Cart } from '../../../features/cart/models/cart.model';
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  cart: Cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
    itemCount: 0
  };
  wishlistCount = 0;
  isMobileMenuOpen = false;
  isShopDropdownOpen = false;
  isLanguageDropdownOpen = false;
  selectedLanguage = 'EN';

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private router: Router,
    private wishlist: WishlistService
  ) {}

  ngOnInit() {
    debugger
    let cartts = localStorage.getItem('cart_items_v1');
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cart => {
        debugger
        this.cart = cart;
      });

    this.wishlist.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        debugger
        this.wishlistCount = items.length;
      });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-dropdown') && !target.closest('.language-selector')) {
        this.isShopDropdownOpen = false;
        this.isLanguageDropdownOpen = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onWishlistClick() {
    this.router.navigate(['/wishlist']);
  }

  onCartClick() {
    this.router.navigate(['/cart']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Shop dropdown methods
  toggleShopDropdown(event: Event) {
    event.preventDefault();
    this.isShopDropdownOpen = !this.isShopDropdownOpen;
    this.isLanguageDropdownOpen = false; // Close other dropdowns
  }

  closeShopDropdown() {
    this.isShopDropdownOpen = false;
    this.closeMobileMenu();
  }

  // Language dropdown methods
  toggleLanguageDropdown(event: Event) {
    event.preventDefault();
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    this.isShopDropdownOpen = false; // Close other dropdowns
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    this.isLanguageDropdownOpen = false;
    // TODO: Implement language switching functionality
    console.log('Language selected:', language);
  }

}
