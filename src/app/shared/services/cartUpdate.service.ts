import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../features/products/models/product.model';

// export interface CartListItem extends Product {}

@Injectable({ providedIn: 'root' })
export class CartUpdateService {
  private readonly STORAGE_KEY = 'cart_items_v1';
  private itemsSubject = new BehaviorSubject<Product[]>(this.load());
  public items$ = this.itemsSubject.asObservable();

  get items(): Product[] { return this.itemsSubject.value; }

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
    if (this.isInCartList(product.id)) {
      this.remove(product.id);
    } else {
      this.add(product);
    }
  }

  clear(): void { this.persist([]); }

  isInCartList(productId: number): boolean {
    return this.items.some(i => i.id === productId);
  }

  private persist(items: Product[]) {
    this.itemsSubject.next(items);
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items)); } catch {}
  }

  private load(): Product[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
}


