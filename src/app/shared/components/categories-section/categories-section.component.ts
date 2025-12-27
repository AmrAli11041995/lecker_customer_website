import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Category } from '../../../features/products/models/product.model';
import { HomeService } from '../../../features/home/services/home.service';
import { AuthRoutingModule } from "../../../features/auth/auth-routing.module";
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [CommonModule, AuthRoutingModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss'
})
export class CategoriesSectionComponent {
  @Output() selectCategory = new EventEmitter<Category>();
  @Input() categories: Category[] = [];
  fileBaseURL = environment.fileBaseURL;
  // Display 6 categories with image placeholders
  // categories: Category[] = [];
  // categories: (Category & { image: string })[] = [];
  private placeholderImages: string[] = [
    'assets/img/Products/nutella.png',
    'assets/img/Products/orange.png',
    'assets/img/Products/oreo.png'
  ];

  constructor(private dataService: DataService ,
     private homeService: HomeService) {
    // this.categories = this.dataService
    //   .getCategories()
    //   .slice(0, 6)
    //   .map((c, i) => ({
    //     ...c,
    //     image: this.placeholderImages[i % this.placeholderImages.length]
    //   }));
    this.homeService.GetCategories().subscribe((res ) => {
      debugger;
      this.categories = (res.data as any[]).slice(0, 6).map((c, i) => ({
        ...c
        // image: 
        // image: this.placeholderImages[i % this.placeholderImages.length]
      }));
    });
  }

  onSelect(category: Category) {
    this.selectCategory.emit(category);
  }
  // goToShopPage() {
  //   this.homeService.goToShopPage();
  // }
}


