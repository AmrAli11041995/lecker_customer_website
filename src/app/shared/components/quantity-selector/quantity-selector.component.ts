import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss'
})
export class QuantitySelectorComponent {
  @Input() quantity: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 99;
  @Output() quantityChange = new EventEmitter<number>();

  onDecrease(): void {
    if (this.quantity > this.min) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  onIncrease(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    
    if (!isNaN(value) && value >= this.min && value <= this.max) {
      this.quantity = value;
      this.quantityChange.emit(this.quantity);
    } else {
      target.value = this.quantity.toString();
    }
  }
}
