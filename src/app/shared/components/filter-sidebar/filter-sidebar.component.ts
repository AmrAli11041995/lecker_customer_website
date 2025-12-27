import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOptions, Category, Product } from '../../../features/products/models/product.model';
import { DataService } from '../../services/data.service';
import { ProductTagsService } from '../../../features/products/services/ProductTags.service';

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss'
})
export class FilterSidebarComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() filterChange = new EventEmitter<any>();
  @Output() toggleSidebar = new EventEmitter<void>();

  filterOptions!: FilterOptions;
  saleProducts: Product[] = [];
  isCollapsed = {
    categories: false,
    price: false,
    rating: false,
    tags: false,
    saleProducts: false
  };

  constructor(private dataService: DataService,
    private productTagsService: ProductTagsService
  ) {}

  ngOnInit() {
     this.filterOptions = this.dataService.getFilterOptions();
    this.getTags();

    this.saleProducts = this.dataService.getSaleProducts();
  }

  toggleCollapse(section: string) {
    this.isCollapsed[section as keyof typeof this.isCollapsed] = !this.isCollapsed[section as keyof typeof this.isCollapsed];
  }

  onCategoryChange(category: Category) {
    category.isSelected = !category.isSelected;
    this.emitFilterChange();
  }

  onPriceRangeChange() {
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
    this.toggleSidebar.emit();
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
}
