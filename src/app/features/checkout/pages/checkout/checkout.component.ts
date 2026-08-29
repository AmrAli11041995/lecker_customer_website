import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BillingFormComponent } from '../../components/billing-form/billing-form.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { CartService } from '../../../cart/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { BillingInfo, OrderSummary, CheckoutData, OrderItem } from '../../models/checkout.model';
import { CheckoutService } from '../../services/checkout.service';
import { ApiResponse } from '../../../../shared/models/apiResponse.model';
import { Copoun } from '../../../cart/models/copoun.model';
import { TranslateService } from '@ngx-translate/core';

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
  discountValue: number = 0;
  appliedCopounToggle: boolean = false;
  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private toastService: ToastService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.initializeOrderSummary();
  }

  private initializeOrderSummary(discountDetails?: Copoun): void {
    debugger
    const cart = this.cartService.getCart();
    let itemsCart: OrderItem[] = cart.items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
      discount: (discountDetails === null || discountDetails === undefined) ? 0 : this.calculateDiscount(discountDetails?.discountType, discountDetails?.discountValue, item.price)
    }));
    itemsCart.forEach(item => {
      item.subtotal = this.calculateTotalForItem(item.quantity, item.price, item.discount);
    });
    this.orderSummary = {
      items: itemsCart,
      copounId: (discountDetails === null || discountDetails === undefined) ? undefined : discountDetails?.id,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      total: (discountDetails === null || discountDetails === undefined) ? cart.total : itemsCart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.subtotal;
      }, 0),
      discount: (discountDetails === null || discountDetails === undefined) ? 0 : itemsCart.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.discount * currentItem.quantity);
      }, 0),
    };
    this.appliedCopounToggle = (discountDetails === null || discountDetails === undefined) ? false : true;
    // If cart is empty, redirect to home
    if (this.orderSummary.items.length === 0) {
      this.toastService.showInfo('Your cart is empty. Please add some products first.');
      this.router.navigate(['/']);
    }
  }
  
  calculateTotalForItem(quantity: number = 0, price: number = 0, discount: number = 0) : number {
    return quantity * (price - discount);
  }

  calculateDiscount(discountType?: number, discountValue: number = 0, price: number = 0): number {
    if (discountType === null) { 
      return 0; 
    }

    if (discountType === 1) {
      // Get Percentage for Copoun
      let discount: number = discountValue / 100;
      return price * discount;
    }
    return 0;
  }
  onBillingInfoChange(billingInfo: BillingInfo): void {
    this.billingInfo = billingInfo;
  }

  onPaymentMethodChange(method: string): void {
    this.selectedPaymentMethod = method;
  }

  onCouponApplied(couponCode: string): void {
    debugger
    var employeeId = localStorage.getItem('employeeId');
    if (employeeId === undefined || employeeId === null) {
      this.toastService.showError('Please Register To Use This Code');
    } else {
      var params = {
        code: couponCode,
        customerId: employeeId
      }
      this.cartService.applayCoupon(params).subscribe({
        next: (res: ApiResponse<Copoun>) => {
          debugger
          if (res.status === true) {
            if (res.data.minOrderValue === null ||
              res.data.minOrderValue === undefined ||
              this.orderSummary.subtotal >= res.data.minOrderValue) {
              // Calculate Discount Value
              this.initializeOrderSummary(res.data);
              this.toastService.showSuccess(`Coupon "${couponCode}" applied successfully!`);
            } else {
              this.toastService.showError(this.translate.instant('ERROR.MinValue'));
            }
          } else {
            this.toastService.showError(res.message!)
          }
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  onClearCoupon(copounCode: string) : void {
    this.initializeOrderSummary(undefined);
  }

  onPlaceOrder(): void {
    // Validate billing info
    ;
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
      email: checkoutData.billingInfo.email,
      phoneNumber: checkoutData.billingInfo.phone,
      companyName: checkoutData.billingInfo.companyName,
      firstName: checkoutData.billingInfo.firstName,
      lastName: checkoutData.billingInfo.lastName,
      customerId: checkoutData.billingInfo.customerId,
      PaymentMethod: checkoutData.paymentMethod,
      totalPrice: checkoutData.orderSummary.total,
      discountValue: checkoutData.orderSummary.discount,
      CopounId: checkoutData.orderSummary.copounId,
      orderAddress: {
        country: checkoutData.billingInfo.country,
        city: checkoutData.billingInfo.city,
        street: checkoutData.billingInfo.streetAddress
      },
      orderDetails: [...orderDetails]
    }
      ;

    this.checkoutService.addOrder(orderObj).subscribe({
      next: (response) => {
        this.cartService.clearCart();

        this.toastService.showSuccess(`Order added successfully!`);
        console.log('Order added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding order:', error);
        this.toastService.showError('Failed to place order. Please try again.');
      }
    });

  }
}
