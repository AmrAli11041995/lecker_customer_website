import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOptions, Category, Product } from '../../../features/products/models/product.model';
import { DataService } from '../../services/data.service';
import { ProductTagsService } from '../../../features/products/services/ProductTags.service';
import { HomeService } from '../../../features/home/services/home.service';

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss'
})
export class FilterSidebarComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() filterChange = new EventEmitter<any>();
  @Output() applyFilterChange = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  filterOptions!: FilterOptions;
  saleProducts: Product[] = [];
  rangeValues: number[] = [0, 0];

  isCollapsed = {
    categories: false,
    price: false,
    rating: false,
    tags: false,
    saleProducts: false
  };

  constructor(private dataService: DataService,
    private productTagsService: ProductTagsService,
    private homeService: HomeService,
  ) {}

  ngOnInit() {
     this.filterOptions = this.dataService.getFilterOptions();
    this.getTags();
    this.getCategories();

    this.saleProducts = this.dataService.getSaleProducts();
  }

  toggleCollapse(section: string) {
    this.isCollapsed[section as keyof typeof this.isCollapsed] = !this.isCollapsed[section as keyof typeof this.isCollapsed];
  }

  onCategoryChange(category: Category) {
    this.filterOptions.categories.forEach(c => c.isSelected = false);
    category.isSelected = true;
    this.emitFilterChange();
  }

  onPriceRangeChange() {
    debugger;
    if (this.rangeValues[0] > this.rangeValues[1]) {
      const temp = this.rangeValues[0];
      this.rangeValues[0] = this.rangeValues[1];
      this.rangeValues[1] = temp;
    }
    this.filterOptions.priceRange = {
      min: this.rangeValues[0],
      max: this.rangeValues[1],
      currentMin: this.rangeValues[0],
      currentMax: this.rangeValues[1],
    };
    this.emitFilterChange();
  }

  onRatingChange(rating: any) {
    rating.isSelected = !rating.isSelected;
    this.emitFilterChange();
  }

  onTagChange(tag: any) {
    tag.isSelected = !tag.isSelected;
    this.emitFilterChange();
  }

  onFilterClick() {
    // this.toggleSidebar.emit();
    this.filterChange.emit(this.filterOptions);
    this.applyFilterChange.emit();

  }
  
  onResetFilterClick() {
    // this.toggleSidebar.emit();
    this.filterOptions.categories.forEach(c => c.isSelected = false);
    this.filterOptions.priceRange = {
      min: 0,
      max: 0,
      currentMin: 0,
      currentMax: 0,
    };
    this.filterOptions.ratings.forEach(r => r.isSelected = false);
    this.filterOptions.tags.forEach(t => t.isSelected = false);
    this.rangeValues = [0, 0];
    this.filterChange.emit(this.filterOptions);
    this.applyFilterChange.emit();

  }

  private emitFilterChange() {
    this.filterChange.emit(this.filterOptions);
  }

  getTags() {
    this.productTagsService.GetTags().subscribe((res) => {
      this.filterOptions.tags = res.data.map((tag: any) => ({
        name: tag.name,
        isSelected: false,
        id: tag.id
      }));
    });
  }
  
  getCategories() {
    this.homeService.GetCategories().subscribe((res) => {
      this.filterOptions.categories = res.data.map((category: any) => ({
        name: category.name,
        isSelected: false,
        id: category.id
      }));
    });
  }
}
