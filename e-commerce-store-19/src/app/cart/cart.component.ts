import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product-item-cart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``,
})
export default class CartComponent {
  state = inject(CartStateService).state;

  onRemoveItem(id: number) {
    this.state.remove(id);
  }

  onDecreaseItem(product: ProductItemCart) {
    if (product.quantity - 1 === 0) {
      this.state.remove(product.product.id);
    } else {
      this.state.update({
        ...product,
        quantity: product.quantity - 1,
      });
    }
  }

  onIncreaseItem(product: ProductItemCart) {
    this.state.update({
      ...product,
      quantity: product.quantity + 1,
    });
  }
}
