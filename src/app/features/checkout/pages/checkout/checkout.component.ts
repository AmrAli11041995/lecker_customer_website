import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BillingFormComponent } from '../../components/billing-form/billing-form.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { CartService } from '../../../cart/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { BillingInfo, OrderSummary, CheckoutData } from '../../models/checkout.model';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, BillingFormComponent, OrderSummaryComponent, ToastComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  billingInfo: BillingInfo = {
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    country: '',
    city: '',
    email: '',
    phone: '',
    shipToDifferentAddress: false,
    orderNotes: ''
  };

  selectedPaymentMethod: string = 'cash';
  orderSummary!: OrderSummary;

  constructor(
    private cartService: CartService,
    private checkoutService : CheckoutService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeOrderSummary();
  }

  private initializeOrderSummary(): void {
    const cart = this.cartService.getCart();
    
    this.orderSummary = {
      items: cart.items.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal
      })),
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      total: cart.total
    };

    // If cart is empty, redirect to home
    if (this.orderSummary.items.length === 0) {
      this.toastService.showInfo('Your cart is empty. Please add some products first.');
      this.router.navigate(['/']);
    }
  }

  onBillingInfoChange(billingInfo: BillingInfo): void {
    this.billingInfo = billingInfo;
  }

  onPaymentMethodChange(method: string): void {
    this.selectedPaymentMethod = method;
  }

  onCouponApplied(couponCode: string): void {
    const success = this.cartService.applyCoupon(couponCode);
    if (success) {
      this.toastService.showSuccess(`Coupon "${couponCode}" applied successfully!`);
      this.initializeOrderSummary(); // Refresh order summary
    } else {
      this.toastService.showError(`Invalid coupon code: "${couponCode}"`);
    }
  }

  onPlaceOrder(): void {
    // Validate billing info
    debugger;
    if (!this.isBillingInfoValid()) {
      this.toastService.showError('Please fill in all required billing information');
      return;
    }

    // Create checkout data
    const checkoutData: CheckoutData = {
      billingInfo: this.billingInfo,
      paymentMethod: this.selectedPaymentMethod,
      orderSummary: this.orderSummary
    };

    // Process order
    this.processOrder(checkoutData);
  }

  private isBillingInfoValid(): boolean {
    return !!(
      this.billingInfo.firstName &&
      this.billingInfo.lastName &&
      this.billingInfo.streetAddress &&
      this.billingInfo.country &&
      this.billingInfo.city &&
      this.billingInfo.email &&
      this.billingInfo.phone
    );
  }

  private processOrder(checkoutData: CheckoutData): void {

    let orderDetails = checkoutData.orderSummary.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      // price: item.price,
      mainPrice: item.price,
      totalPrice: item.price * item.quantity,
    }));
    let orderObj = {
      date: new Date(),
      PaymentMethod: checkoutData.paymentMethod,
      totalPrice: checkoutData.orderSummary.total,
      orderAddress:{
        country: checkoutData.billingInfo.country,
        city: checkoutData.billingInfo.city,
        street: checkoutData.billingInfo.streetAddress
      },
      orderDetails: [...orderDetails]
    }
    debugger;

    this.checkoutService.addOrder(orderObj).subscribe({
      next: (response) => {
        debugger
        this.cartService.clearCart();
    
    // Redirect to home after a short delay
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
        console.log('Order added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding order:', error);
        this.toastService.showError('Failed to place order. Please try again.');
      }
    });
    // Simulate order processing
    // console.log('Processing order:', checkoutData);
    
    // // Show success message
    // this.toastService.showSuccess('Order placed successfully!');
    
    // Clear cart
    // this.cartService.clearCart();
    
    // // Redirect to home after a short delay
    // setTimeout(() => {
    //   this.router.navigate(['/']);
    // }, 2000);
  }
}
