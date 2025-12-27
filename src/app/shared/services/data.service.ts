import { Injectable } from '@angular/core';
import { Product, Category, FilterOptions, SearchOptions } from '../../features/products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  getDummyProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'Nutella Jar',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png', 
        price: 14.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy', 'Kids foods'],
        isOnSale: false
      },
      {
        id: 2,
        name: 'Juice Go 1liter',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 14.99, 
        rating: 5,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Vitamins'],
        isOnSale: true,
        originalPrice: 18.99,
        salePercentage: 21
      },
      {
        id: 3,
        name: 'Gummy Jelly Beans',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 14.80,
        originalPrice: 20.00,
        rating: 5,
        isInStock: false,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: true,
        salePercentage: 26
      },
      {
        id: 4,
        name: 'Oreo Cookie Pack',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 14.99,
        rating: 5,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: false
      },
      {
        id: 5,
        name: 'Nutella Jar',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 14.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy', 'Kids foods'],
        isOnSale: false
      },
      {
        id: 6,
        name: 'Juice Go 1liter',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 14.99,
        rating: 5,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 7,
        name: 'Nutella Jar',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 14.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy', 'Kids foods'],
        isOnSale: false
      },
      {
        id: 8,
        name: 'Juice Go 1liter',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 14.99,
        rating: 5,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 9,
        name: 'Gummy Jelly Beans',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 14.80, 
        originalPrice: 20.00,
        rating: 5,
        isInStock: false,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: true,
        salePercentage: 26
      },
      {
        id: 10,
        name: 'Chocolate Chip Cookies',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 12.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: false
      },
      {
        id: 11,
        name: 'Energy Bar Pack',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 18.50,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 12,
        name: 'Dark Chocolate Bar',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 16.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy'],
        isOnSale: false
      },
      {
        id: 13,
        name: 'Fruit Gummies',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 13.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 14,
        name: 'Protein Cookies',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 19.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 15,
        name: 'Milk Chocolate',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 15.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Kids foods'],
        isOnSale: false
      },
      {
        id: 16,
        name: 'Trail Mix',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 17.50,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Snacks'],
        isOnSale: false
      },
      {
        id: 17,
        name: 'Granola Bars',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 14.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 18,
        name: 'White Chocolate',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 16.50,
        rating: 4,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Kids foods'],
        isOnSale: false
      },
      {
        id: 19,
        name: 'Honey Roasted Nuts',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 21.99,
        rating: 5,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Snacks'],
        isOnSale: false
      },
      {
        id: 20,
        name: 'Coconut Cookies',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 15.50, 
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: false
      },
      {
        id: 21,
        name: 'Peanut Butter Cups',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 18.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Kids foods'],
        isOnSale: false
      },
      {
        id: 22,
        name: 'Mixed Berry Gummies',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 14.50,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 23,
        name: 'Almond Chocolate Bar',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 19.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy'],
        isOnSale: false
      },
      {
        id: 24,
        name: 'Oatmeal Raisin Cookies',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 16.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Kids foods'],
        isOnSale: false
      },
      {
        id: 25,
        name: 'Caramel Popcorn',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 13.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: false
      },
      {
        id: 26,
        name: 'Mint Chocolate',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 17.50,
        rating: 4,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Kids foods'],
        isOnSale: false
      },
      {
        id: 27,
        name: 'Fruit Leather',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 12.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Healthy', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 28,
        name: 'Hazelnut Spread',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 22.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy', 'Kids foods'],
        isOnSale: false
      },
      {
        id: 29,
        name: 'Chocolate Covered Pretzels',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 18.50,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: false
      },
      {
        id: 30,
        name: 'Vanilla Wafers',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 14.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: false
      },
      {
        id: 31,
        name: 'Strawberry Gummies',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 13.50,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Vitamins'],
        isOnSale: false
      },
      {
        id: 32,
        name: 'Dark Chocolate Truffles',
        // image: 'assets/img/Products/orange.png',
        imageUrl: 'assets/img/Products/orange.png', 
        price: 24.99,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy'],
        isOnSale: false
      },
      {
        id: 33,
        name: 'Cinnamon Cookies',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 15.99,
        rating: 4,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods', 'Snacks'],
        isOnSale: false
      }
    ];
  }

  getCategories(): Category[] {
    return [
      { id: 1, name: 'Candy', count: 154, isSelected: false },
      { id: 2, name: 'Chocolates', count: 160, isSelected: true },
      { id: 3, name: 'Cakes', count: 54, isSelected: false },
      { id: 4, name: 'Chips', count: 47, isSelected: false },
      { id: 5, name: 'Muesli', count: 43, isSelected: false },
      { id: 6, name: 'Big Packs', count: 18, isSelected: false },
      { id: 7, name: 'Hot drinks', count: 14, isSelected: false }
    ];
  }

  getFilterOptions(): FilterOptions {
    return {
      categories: this.getCategories(),
      priceRange: {
        min: 0,
        max: 2000,
        currentMin: 50,
        currentMax: 1500
      },
      ratings: [
        { value: 5, label: '5.0', isSelected: false },
        { value: 4, label: '4.0 & up', isSelected: true },
        { value: 3, label: '3.0 & up', isSelected: false },
        { value: 2, label: '2.0 & up', isSelected: false },
        { value: 1, label: '1.0 & up', isSelected: false }
      ],
      tags: [
        { name: 'Healthy', isSelected: false },
        { name: 'Low fat', isSelected: true },
        { name: 'Vegetarian', isSelected: false },
        { name: 'Kids foods', isSelected: false },
        { name: 'Vitamins', isSelected: false },
        { name: 'Bread', isSelected: false },
        { name: 'Coco', isSelected: false },
        { name: 'Snacks', isSelected: false },
        { name: '18th', isSelected: false },
        { name: 'Launch', isSelected: false },
        { name: 'Dinner', isSelected: false },
        { name: 'Breakfast', isSelected: false },
        { name: 'Fruit', isSelected: false }
      ]
    };
  }

  getSearchOptions(): SearchOptions {
    return {
      query: '',
      sortBy: 'Latest',
      resultsCount: 52
    };
  }

  getSaleProducts(): Product[] {
    return [
      {
        id: 10,
        name: 'Nutella Jar',
        // image: 'assets/img/Products/nutella.png',
        imageUrl: 'assets/img/Products/nutella.png',  
        price: 30.00,
        originalPrice: 32.00,
        rating: 5,
        isInStock: true,
        category: 'Chocolates',
        tags: ['Healthy'],
        isOnSale: true,
        salePercentage: 6
      },
      {
        id: 11,
        name: 'Oreo Pack 24 pcs',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png', 
        price: 20.00,
        originalPrice: 24.00,
        rating: 5,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods'],
        isOnSale: true,
        salePercentage: 17
      },
      {
        id: 12,
        name: 'Gummy Pack',
        // image: 'assets/img/Products/oreo.png',
        imageUrl: 'assets/img/Products/oreo.png',
        price: 20.00, 
        // basePrice: 20.00, 
        originalPrice: 32.00,
        rating: 5,
        isInStock: true,
        category: 'Candy',
        tags: ['Kids foods'],
        isOnSale: true,
        salePercentage: 38
      }
    ];
  }
}
