import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../data-access/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../ui/product-card-skeleton/product-card-skeleton.component';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product-interface';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, ProductCardSkeletonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductStateService],
})
export default class ProductListComponent {
  productState = inject(ProductStateService);
  cartState = inject(CartStateService).state;

  products = Array(8).fill(null);

  addToCart(product: Product) {
    this.cartState.add({
      product,
      quantity: 1,
    });
  }

  changePage() {
    const page = this.productState.state.page() + 1;
    this.productState.changePages.next(page);
  }

  selectCategory(category: string) {
    this.productState.changeCategory.next(category);
  }

  selectAllProducts() {
    this.selectCategory('');
  }

  getElectronicProducts() {
    this.selectCategory('electronics');
  }

  getJewelryProducts() {
    this.selectCategory('jewelery');
  }

  getMenClothingProducts() {
    this.selectCategory("men's clothing");
  }

  getWomenClothingProducts() {
    this.selectCategory("women's clothing");
  }
}
