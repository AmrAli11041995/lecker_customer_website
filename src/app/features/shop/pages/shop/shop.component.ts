import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeroBannerComponent } from '../../../../shared/components/hero-banner/hero-banner.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { FilterSidebarComponent } from '../../../../shared/components/filter-sidebar/filter-sidebar.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ProductModalComponent } from '../../../../shared/components/product-modal/product-modal.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { DataService } from '../../../../shared/services/data.service';
import { CartService } from '../../../cart/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Product, SearchOptions, Category } from '../../../products/models/product.model';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    HeroBannerComponent,
    SearchBarComponent,
    FilterSidebarComponent,
    ProductCardComponent,
    PaginationComponent,
    ProductModalComponent,
    ToastComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit, OnDestroy {
  @ViewChild('filterSidebar') filterSidebar!: FilterSidebarComponent;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchOptions: SearchOptions = { query: '', sortBy: 'All', resultsCount: 0 };
  currentPage = 1;
  itemsPerPage = 9;
  isFilterSidebarOpen = true; // Open by default on desktop

  // Modal state
  selectedProduct: Product | null = null;
  isModalOpen = false;
  currentFilters: { PageNumber: number; PageSize: number; SearchTerm: string | null; TagIds: (number | null)[] | null; Rate: number | null; SortBy: string | null } | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.dataService.filterQuery$.pipe(takeUntil(this.destroy$)).subscribe(query => {
      this.currentFilters = query;
      this.currentPage = query.PageNumber;
      this.itemsPerPage = query.PageSize;
      this.productService.GetProducts(query).subscribe({
        next: (response) => {
          this.products = response.data;
          this.filteredProducts = [...this.products];
          this.sortProducts();
          this.updateSearchOptions();
        },
        error: (error) => {
          console.error('Error applying filters:', error);
          this.toastService.showError('Failed to apply filters. Please try again.');
        }
      });
    });
    this.handleResponsiveSidebar();
    window.addEventListener('resize', () => this.handleResponsiveSidebar());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleResponsiveSidebar() {
    if (window.innerWidth <= 768) {
      this.isFilterSidebarOpen = false; // Collapsed on mobile
    } else {
      this.isFilterSidebarOpen = true; // Always visible on desktop
    }
  }

  // loadProducts() {
  //   this.products = this.dataService.getDummyProducts();
  //   this.filteredProducts = [...this.products];
  //   this.sortProducts();
  //   this.updateSearchOptions();
  // }
  loadProducts() {
    let prodId = null
    if (this.dataService.selectedTopSellerProduct) {
      prodId = this.dataService.selectedTopSellerProduct.id;
    }
    const query = { PageNumber: 1, PageSize: this.itemsPerPage, SearchTerm: null, TagIds: null, Rate: null, SortBy: null, productId: prodId };
    this.productService.GetProducts(query).subscribe({
      next: (response) => {
        this.products = response.data;
        this.filteredProducts = [...this.products];
        this.dataService.selectedTopSellerProduct = null;
        this.sortProducts();
        this.updateSearchOptions();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.toastService.showError('Failed to load products. Please try again.');
      }
    });
  }

  onSearchChange(query: string) {
    this.searchOptions.query = query;
    this.filterProducts();
    this.onApplyFilters();
  }

  onSortChange(sortBy: string) {
    this.searchOptions.sortBy = sortBy;
    this.onApplyFilters()
    // this.sortProducts();
  }

  onCategoryChange(category: Category) {
    if (!category || !category.name?.trim()) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.categoryId === category.id
      );
    }
    this.sortProducts();
    this.updateSearchOptions();
  }

  filterProducts() {
    // if (!this.searchOptions.query.trim()) {
    //   this.filteredProducts = [...this.products];
    // } else {
    //   this.filteredProducts = this.products.filter(product =>
    //     product.name.toLowerCase().includes(this.searchOptions.query.toLowerCase()) ||
    //     product.category?.toLowerCase().includes(this.searchOptions.query.toLowerCase()) ||
    //     product.tags?.some(tag => tag.toLowerCase().includes(this.searchOptions.query.toLowerCase()))
    //   );
    // }
    // this.updateSearchOptions();
  }

  selectedSortByEnum?: SortByEnum;
  sortProducts() {
    switch (this.searchOptions.sortBy) {
      case 'Price Low to High':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        this.selectedSortByEnum = SortByEnum.LowPrice;
        break;
      case 'Price High to Low':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        this.selectedSortByEnum = SortByEnum.HighPrice;

        break;
      case 'Rating':
        this.filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        this.selectedSortByEnum = SortByEnum.Rate;

        break;
      case 'Name A-Z':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        this.selectedSortByEnum = SortByEnum.NameFromAtoZ;

        break;
      case 'Name Z-A':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        this.selectedSortByEnum = SortByEnum.NameFromZtoA;

        break;
      case 'Latest':
        this.filteredProducts.sort((a, b) => b.id - a.id);
        this.selectedSortByEnum = SortByEnum.Latest;
        break;
      default: // All - no sorting, show all products
        // Keep original order
        break;
    }
  }

  updateSearchOptions() {
    this.searchOptions.resultsCount = this.filteredProducts.length;
  }

  onAddToCart(product: Product, quantity?: number) {
    if (!product.isInStock) {
      this.toastService.showError('This product is currently out of stock');
      return;
    }

    this.cartService.addItem(product, quantity);
    this.toastService.showSuccess(`${product.name} added to cart!`);
  }

  onAddToWishlist(product: Product) {
    console.log('Added to wishlist:', product);
    // TODO: Implement wishlist functionality
  }

  onViewProduct(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const base = this.currentFilters ?? { PageNumber: page, PageSize: this.itemsPerPage, SearchTerm: null, TagIds: null, Rate: null, SortBy: null };
    const query = { ...base, PageNumber: page, PageSize: base.PageSize ?? this.itemsPerPage };
    this.productService.GetProducts(query).subscribe({
      next: (response) => {
        this.products = response.data;
        this.filteredProducts = [...this.products];
        this.updateSearchOptions();
      },
      error: (error) => {
        console.error('Error changing page:', error);
        this.toastService.showError('Failed to load page. Please try again.');
      }
    });
  }

  onFilterChange(filters: any) {
    console.log('Filters changed:', filters);
    // this.onApplyFilters();
  }

  onApplyFilters() {
    // this.currentFilters = query;
    ;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    let query = {
      pageNumber: 1,
      pageSize: 10,
      searchTerm: this.searchOptions.query,
      minPrice: this.filterSidebar.filterOptions.priceRange?.min ?? null,
      maxPrice: this.filterSidebar.filterOptions.priceRange?.max ?? null,
      categoryId: this.filterSidebar.filterOptions.categories.find(x => x.isSelected)?.id ?? null,
      categoryIds: this.filterSidebar.filterOptions.categories.filter(x => x.isSelected).map(x => x.id),
      tagIds: this.filterSidebar.filterOptions.tags.filter(x => x.isSelected).map(tag => tag.id),
      rate: null,
      rates: this.filterSidebar.filterOptions.ratings.filter(x => x.isSelected).map(tag => tag.value),
      sortBy: this.selectedSortByEnum,
    }
    this.productService.GetProducts(query).subscribe({
      next: (response) => {
        this.products = response.data;
        this.filteredProducts = [...this.products];
        this.sortProducts();
        this.updateSearchOptions();
      },
      error: (error) => {
        console.error('Error applying filters:', error);
        this.toastService.showError('Failed to apply filters. Please try again.');
      }
    });
  }

  onToggleFilterSidebar() {
    this.isFilterSidebarOpen = !this.isFilterSidebarOpen;
  }

  // Modal methods
  onCloseModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  onModalAddToCart(product: Product) {
    this.onAddToCart(product, product.orderedQuantity);
    this.onCloseModal();
  }

  onModalAddToWishlist(product: Product) {
    this.onAddToWishlist(product);
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }
}

export enum SortByEnum {
  Latest = 1,
  HighPrice = 2,
  LowPrice = 3,
  Rate = 4,
  NameFromAtoZ = 5,
  NameFromZtoA = 6
}