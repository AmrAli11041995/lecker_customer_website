import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    // redirectTo: 'home',
    pathMatch: 'full'   // default route
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./features/wishlist/wishlist.module').then(m => m.WishlistModule)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '**', // لو دخل على مسار غلط
    redirectTo: 'home'
  }
];
