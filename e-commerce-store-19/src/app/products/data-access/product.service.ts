import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product-interface';

const LIMIT: number = 8;

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService {
  getProducts(page: number): Observable<Product[]> {
    return this._http.get<Product[]>(`${this._apiUrl}/products`, {
      params: { limit: page * LIMIT },
    });
  }

  getCategoryProducts(category: string, page: number): Observable<Product[]> {
    return this._http.get<Product[]>(
      `${this._apiUrl}/products/category/${category}`,
      {
        params: { limit: LIMIT * page },
      },
    );
  }
}
