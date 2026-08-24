import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem, CouponCode } from '../models/cart.model';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { Copoun } from '../models/copoun.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly copounServiceUrl: string = `${environment.apiBaseUrlGateWay}/Order/Copoun`
  private readonly STORAGE_KEY = 'cart_items_v1';
  private cartSubject = new BehaviorSubject<Cart>(this.getInitialCart());
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {

  }
  private getInitialCart(): Cart {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const cart: Cart = JSON.parse(raw);
        cart.items = cart.items || [];
        this.calculateTotals(cart);
        return cart;
      }
    } catch {
      return { items: [], subtotal: 0, shipping: 0, total: 0, itemCount: 0 };

    }
    return { items: [], subtotal: 0, shipping: 0, total: 0, itemCount: 0 };
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  addItem(product: any, quantity?: number): void {
    const cart = this.getCart();
    const existingItem = cart.items.find(item => item.productId === product.id);

    if (existingItem) {
      // If item already exists, increase quantity
      existingItem.quantity += quantity || 1;
      existingItem.subtotal = existingItem.price * existingItem.quantity;
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: Date.now(), // Simple ID generation
        productId: product.id,
        name: product.name,
        image: product.image?.imageUrl ? environment.fileBaseURL + product.image?.imageUrl : 'assets/img/cookies.png',
        price: product.price,
        quantity: quantity || 1,
        subtotal: product.price * (quantity || 1)
      };
      cart.items.push(newItem);
    }

    this.calculateTotals(cart);
    this.persist(cart);
    this.cartSubject.next(cart);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const cart = this.getCart();
    const item = cart.items.find(item => item.id === itemId);

    if (item) {
      item.quantity = Math.max(1, quantity);
      item.subtotal = item.price * item.quantity;
      this.calculateTotals(cart);
      this.persist(cart);
      this.cartSubject.next(cart);
    }
  }

  removeItem(itemId: number): void {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    this.calculateTotals(cart);
    this.persist(cart);
    this.cartSubject.next(cart);
  }

  applayCoupon(param: any): Observable<ApiResponse<Copoun>> {
    return this.http.get<ApiResponse<Copoun>>(`${this.copounServiceUrl}/Validate`, {params: param})
  }
  applyCoupon(couponCode: string): boolean {
    // Dummy coupon validation
    const validCoupons: { [key: string]: CouponCode } = {
      'SAVE10': { code: 'SAVE10', discount: 10, type: 'percentage' },
      'FREESHIP': { code: 'FREESHIP', discount: 0, type: 'fixed' }
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      // Apply coupon logic here
      return true;
    }
    return false;
  }

  private calculateTotals(cart: Cart): void {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
    cart.shipping = cart.subtotal > 50 ? 0 : 10; // Free shipping over $50
    cart.total = cart.subtotal + cart.shipping;
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart(): void {
    // this.cartSubject.next({
    //   items: [],
    //   subtotal: 0,
    //   shipping: 0,
    //   total: 0,
    //   itemCount: 0
    // });
    const empty: Cart = { items: [], subtotal: 0, shipping: 0, total: 0, itemCount: 0 };
    this.persist(empty);
    this.cartSubject.next(empty);
  }
  private persist(cart: Cart): void {
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart)); } catch { }
  }
}
