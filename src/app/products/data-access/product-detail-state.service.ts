import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  Subject,
  startWith,
  switchMap,
  map,
  catchError,
  of,
  Observable,
} from 'rxjs';
import { Product } from '../../shared/interfaces/product-interface';
import { ProductService } from './product.service';

interface State {
  product: Product | null;
  status: 'loading' | 'success' | 'error';
  category: string;
}

@Injectable()
export class ProductDetailStateService {
  private _productService = inject(ProductService);

  private initialState: State = {
    product: null,
    status: 'loading' as const,
    category: '',
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => this._productService.getProduct(id)),
          map((data) => ({ product: data, status: 'success' as const })),
        ),
    },
  });

  constructor() {}
}
