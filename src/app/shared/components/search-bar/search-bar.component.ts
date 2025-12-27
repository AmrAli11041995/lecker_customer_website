import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../features/products/models/product.model';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() searchQuery: string = '';
  @Input() sortBy: string = 'All';
  @Input() resultsCount: number = 0;
  
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<Category>();

  selectedCategory: Category;

  constructor() {
    this.selectedCategory = {} as Category;
  }
  
  sortOptions = [
    { value: 'All', label: 'All' },
    { value: 'Latest', label: 'Latest' },
    { value: 'Price Low to High', label: 'Price Low to High' },
    { value: 'Price High to Low', label: 'Price High to Low' },
    { value: 'Rating', label: 'Rating' },
    { value: 'Name A-Z', label: 'Name A-Z' },
    { value: 'Name Z-A', label: 'Name Z-A' }
  ];

  categories :Category[] = [];

  onSearchChange() {
    this.searchChange.emit(this.searchQuery);
  }

  onSortChange() {
    this.sortChange.emit(this.sortBy);
  }

  onCategoryChange() {
    this.categoryChange.emit(this.selectedCategory);
  }
}
