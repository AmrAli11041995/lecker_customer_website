export interface BillingInfo {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  shipToDifferentAddress: boolean;
  orderNotes?: string;
}

export interface PaymentMethod {
  type: 'cash' | 'credit' | 'other';
  label: string;
}

export interface OrderSummary {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  discount: number;
  copounId?: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
  discount: number;
}

export interface CheckoutData {
  billingInfo: BillingInfo;
  paymentMethod: string;
  orderSummary: OrderSummary;
}
