import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currencyCode: string;
  imageLink: string;
  quantity?: number;
  specifications?: string[];
}

@Injectable()
export class ProductsService {
  private products: Product[];

  constructor(
    private httpClient: HttpClient
  ) { }

  fetchAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:3000/products')
      .pipe(tap(products => {
        this.products = products;
      }));
  }

  getProduct(id: string): Product {
    return this.products.find(product => product.id === id);
  }
}
