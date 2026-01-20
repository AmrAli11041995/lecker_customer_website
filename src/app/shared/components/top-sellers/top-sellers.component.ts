import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../../features/products/models/product.model';
import { ProductService } from '../../../features/products/services/product.service';
import { environment } from '../../../../environments/environment.development';
import { AuthRoutingModule } from "../../../features/auth/auth-routing.module";

@Component({
  selector: 'app-top-sellers',
  standalone: true,
  imports: [CommonModule, AuthRoutingModule, TranslateModule],
  templateUrl: './top-sellers.component.html',
  styleUrl: './top-sellers.component.scss'
})
export class TopSellersComponent {
  products: Product[] = [];
  @ViewChild('track', { static: false }) trackRef?: ElementRef<HTMLDivElement>;
  fileBaseURL = environment.fileBaseURL;

  constructor(private dataService: DataService , private productService: ProductService) {
    // this.products = this.dataService.getDummyProducts().slice(0, 4);
    this.productService.GetTopSellerProducts().subscribe((res) => {
      this.products = res.data;
    });
  }

  selectProduct(product: Product) {
    this.dataService.selectedTopSellerProduct = product;
  }

  private scrollByCards(direction: 1 | -1) {
    const el = this.trackRef?.nativeElement;
    if (!el) return;
    const card = el.querySelector('.card') as HTMLElement | null;
    const cardWidth = card ? card.getBoundingClientRect().width + 24 : el.clientWidth / 2;
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  onPrev() { this.scrollByCards(-1); }
  onNext() { this.scrollByCards(1); }
}


