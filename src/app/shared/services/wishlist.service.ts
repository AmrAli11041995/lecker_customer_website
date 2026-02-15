import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../features/products/models/product.model';

export interface WishlistItem extends Product { }

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly STORAGE_KEY = 'wishlist_items_v1';
  private itemsSubject = new BehaviorSubject<WishlistItem[]>(this.load());
  public items$ = this.itemsSubject.asObservable();

  get items(): WishlistItem[] { return this.itemsSubject.value; }

  add(product: Product): void {
    const exists = this.items.find(i => i.id === product.id);
    if (exists) return;
    const updated = [...this.items, product];
    this.persist(updated);
  }

  remove(productId: number): void {
    const updated = this.items.filter(i => i.id !== productId);
    this.persist(updated);
  }

  toggle(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this.remove(product.id);
    } else {
      this.add(product);
    }
  }

  clear(): void { this.persist([]); }

  isInWishlist(productId: number): boolean {
    return this.items.some(i => i.id === productId);
  }

  private persist(items: WishlistItem[]) {
    this.itemsSubject.next(items);
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items)); } catch { }
  }

  private load(): WishlistItem[] {
    try {
      ;
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
}


