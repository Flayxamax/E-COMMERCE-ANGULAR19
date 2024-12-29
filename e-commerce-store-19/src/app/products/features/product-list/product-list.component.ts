import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../data-access/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../ui/product-card-skeleton/product-card-skeleton.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, ProductCardSkeletonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductStateService],
})
export default class ProductListComponent {
  productState = inject(ProductStateService);
}
