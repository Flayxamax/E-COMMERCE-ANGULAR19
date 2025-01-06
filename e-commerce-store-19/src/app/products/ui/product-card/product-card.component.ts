import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product-interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  addToCart = output<Product>();

  add(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product());
  }

  getStarArray(): string[] {
    const rate = Math.floor(this.product().rating.rate);
    const totalStars = 5;
    const fullStars = Array(rate).fill('full');
    const emptyStars = Array(totalStars - rate).fill('empty');
    return [...fullStars, ...emptyStars];
  }
}
