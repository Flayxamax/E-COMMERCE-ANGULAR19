import { Component, effect, inject, input } from '@angular/core';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { ProductDetailSkeletonComponent } from '../../ui/product-detail-skeleton/product-detail-skeleton.component';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, ProductDetailSkeletonComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [ProductDetailStateService],
})
export default class ProductDetailComponent {
  _productDetailState = inject(ProductDetailStateService);

  id = input.required<string>();

  constructor() {
    effect(() => {
      console.log(this._productDetailState.state.getById(this.id()));
    });
  }

  getStarArray(): string[] {
    const product = this._productDetailState.state.product();
    const rate =
      product && product.rating ? Math.floor(product.rating.rate) : 0;
    const totalStars = 5;
    const fullStars = Array(rate).fill('full');
    const emptyStars = Array(totalStars - rate).fill('empty');
    return [...fullStars, ...emptyStars];
  }
}
