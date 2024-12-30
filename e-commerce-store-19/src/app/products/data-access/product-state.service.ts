import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/interfaces/product-interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from './product.service';
import { map, startWith, Subject, switchMap } from 'rxjs';

interface State {
  products: Product[];
  status: 'loading' | 'success' | 'error';
  page: number;
  category: string;
}

@Injectable()
export class ProductStateService {
  private _productService = inject(ProductService);

  private initialState: State = {
    products: [],
    status: 'loading' as const,
    page: 1,
    category: '',
  };

  changePages = new Subject<number>();
  changeCategory = new Subject<string>();

  loadProducts = this.changePages.pipe(
    startWith(this.initialState.page),
    switchMap((page) => {
      const category = this.initialState.category;
      return category
        ? this._productService.getCategoryProducts(category, page)
        : this._productService.getProducts(page);
    }),
    map((products) => ({ products, status: 'success' as const })),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePages.pipe(
        map((page) => ({ page, status: 'loading' as const })),
      ),
      this.loadProducts,

      //change category
      this.changeCategory.pipe(
        switchMap((category) => {
          this.initialState.category = category;
          return this.loadProducts.pipe(
            startWith({ products: [], status: 'loading' as const }),
          );
        }),
      ),
    ],
  });

  constructor() {}
}
