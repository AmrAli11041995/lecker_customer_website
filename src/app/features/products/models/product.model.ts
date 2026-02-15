export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  image?: Image;
  // image: string;
  price: number;
  //basePrice: number;
  originalPrice?: number;
  rating?: number;
  isInStock?: boolean;
  category?: string;
  categoryId?: number;
  tags?: string[];
  isOnSale?: boolean;
  salePercentage?: number;
  orderedQuantity?: number;
  skw?: string;
  brand?: string;
  descreption?: string;
  brandId?: number;
}
export interface Image {
  id: number;
  imageBase?: string;
  imageUrl: string;

}
export interface Category {
  id: number;
  name: string;
  description?: string;
  fileUrl?: string;
  count: number;
  isSelected: boolean;
  categoryStatusEnum?: number;

}

export interface FilterOptions {
  categories: Category[];
  priceRange: {
    min?: number;
    max?: number;
    currentMin?: number;
    currentMax?: number;
  };
  ratings: {
    value: number;
    label: string;
    isSelected: boolean;
  }[];
  tags: {
    // id?: number;
    name: string;
    isSelected: boolean;
  }[];
}

export interface SearchOptions {
  query?: string;
  sortBy?: string;
  resultsCount?: number;
}
