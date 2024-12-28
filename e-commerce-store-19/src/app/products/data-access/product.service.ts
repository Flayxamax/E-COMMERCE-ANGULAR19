import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private _http = inject(HttpClient);

  getProducts() {
    return this._http.get('/api/products');
  }
}
