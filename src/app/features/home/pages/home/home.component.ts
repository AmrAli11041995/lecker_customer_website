import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../../../shared/components/hero-banner/hero-banner.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { FilterSidebarComponent } from '../../../../shared/components/filter-sidebar/filter-sidebar.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ProductGridComponent } from '../../../../shared/components/product-grid/product-grid.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ProductModalComponent } from '../../../../shared/components/product-modal/product-modal.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { DataService } from '../../../../shared/services/data.service';
import { CategoriesSectionComponent } from '../../../../shared/components/categories-section/categories-section.component';
import { TopSellersComponent } from '../../../../shared/components/top-sellers/top-sellers.component';
import { CartService } from '../../../cart/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Category, Product, SearchOptions } from '../../../products/models/product.model';
import { HomeService } from '../../services/home.service';
import { ProductService } from '../../../products/services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeroBannerComponent,
    CategoriesSectionComponent,
    TopSellersComponent,
    SearchBarComponent,
    FilterSidebarComponent,
    ProductCardComponent,
    PaginationComponent,
    ProductModalComponent,
    ReactiveFormsModule,
    TranslateModule,
    ToastComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchOptions: SearchOptions = { query: '', sortBy: 'All', resultsCount: 0 };
  currentPage = 1;
  itemsPerPage = 9;
  isFilterSidebarOpen = true; // Open by default on desktop
  categories: Category[] = [];
  // Modal state
  selectedProduct: Product | null = null;
  isModalOpen = false;
  contactForm!: FormGroup;
  submitted = false;

   get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }
  
  constructor(
    private dataService: DataService,
    private productService: ProductService,
    private homeService: HomeService,
    private emailService: EmailService,
    private cartService: CartService,
        private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit() {
     this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      emailTo: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      description: ['']
    });
    this.loadProducts();
    this.loadCategories();
    this.handleResponsiveSidebar();
    window.addEventListener('resize', () => this.handleResponsiveSidebar());
  }

  private handleResponsiveSidebar() {
    if (window.innerWidth <= 768) {
      this.isFilterSidebarOpen = false; // Collapsed on mobile
    } else {
      this.isFilterSidebarOpen = true; // Always visible on desktop
    }
  }
  
  currentCategoryPage: number=1;
  totalCategoryPages: number=1;
  loadCategories(){
     this.homeService.GetCategories({
      pageNumber:this.currentCategoryPage,
      pageSize:6,
     }).subscribe((res ) => {
      debugger;
      this.categories = [...res.entities.items] 
      this.totalCategoryPages = res.entities.totalPages;
      this.currentCategoryPage = res.entities.currentPage;
    });
  }
  onCategoryPageChange(pageNumber: number) {
    this.currentCategoryPage = pageNumber;
    this.loadCategories();
  }
  loadProducts() {
    this.productService.GetProducts({
      pageNumber:1,
      pageSize:10,
      searchTerm:null,
      tagIds:[],
      rate:null,
      sortBy:null,
    }).subscribe({
      next: (response) => {
        debugger;
        this.products = response.data;
        this.filteredProducts = [...this.products];
        this.sortProducts();
        this.updateSearchOptions();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.toastService.showError('Failed to load products. Please try again.');
      }
    });
    // this.products = this.dataService.getDummyProducts();
    // this.filteredProducts = [...this.products];
    // this.sortProducts();
    // this.updateSearchOptions();
  }

  onSearchChange(query: string) {
    this.searchOptions.query = query;
    this.filterProducts();
  }

  onSortChange(sortBy: string) {
    this.searchOptions.sortBy = sortBy;
    this.sortProducts();
  }

  onCategoryChange(category: Category) {
    if (!category) {
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

  sortProducts() {
    switch (this.searchOptions.sortBy) {
      case 'Price Low to High':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price High to Low':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Rating':
        this.filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Name A-Z':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name Z-A':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Latest':
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default: // All - no sorting, show all products
        // Keep original order
        break;
    }
  }

  updateSearchOptions() {
    this.searchOptions.resultsCount = this.filteredProducts.length;
  }

  onAddToCart(product: Product) {
    // if (!product.isInStock) {
    //   this.toastService.showError('This product is currently out of stock');
    //   return;
    // }
        console.log('Added to cart:', product);

    // this.cartService.addItem(product);
    // this.toastService.showSuccess(`${product.name} added to cart!`);
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
  }

  onFilterChange(filters: any) {
    // TODO: Implement filter logic
    console.log('Filters changed:', filters);
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
    this.onAddToCart(product);
    this.onCloseModal();
  }

  onModalAddToWishlist(product: Product) {
    this.onAddToWishlist(product);
  }

 
  onSendRequest() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const payload = this.contactForm.value;
    this.emailService.sendEmail(payload).subscribe(res=>{
      this.toastService.showSuccess('Email sent successfully!');
      this.contactForm.reset();
      this.submitted = false;
    },
  (er)=>{
          this.toastService.showError('Email not sent!');
  })
    console.log('Contact form submitted:', payload);
  }
}
