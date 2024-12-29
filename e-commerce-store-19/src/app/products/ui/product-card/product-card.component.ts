import { Component, input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product-interface';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  getStarArray(): string[] {
    const rate = Math.floor(this.product().rating.rate);
    const totalStars = 5;
    const fullStars = Array(rate).fill('full');
    const emptyStars = Array(totalStars - rate).fill('empty');
    return [...fullStars, ...emptyStars];
  }
}
