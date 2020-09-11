import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../components/products/products.service';

export interface ShoppingCart {
  shopId: string;
  products: Product[]
}

@Injectable()
export class ShoppingCartService {
  private shoppingCartSubject = new BehaviorSubject<ShoppingCart>(undefined);

  get shoppingCart(): Observable<ShoppingCart> {
    return this.shoppingCartSubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  initShoppingCart(): void {
    this.httpClient.post<ShoppingCart>('http://localhost:3000/initShoppingCart', undefined)
      .pipe(take(1))
      .subscribe(soppingCart => {
        this.shoppingCartSubject.next(soppingCart);
      });
  }

  addProductToShoppingCart(productId: string, quantity: number): Observable<ShoppingCart> {
    const requestBody = {
      id: this.shoppingCartSubject.getValue().shopId,
      productId,
      quantity
    };

    return this.httpClient.post<ShoppingCart>('http://localhost:3000/addProduct', requestBody, { headers: { 'Content-Type': 'application/json' } })
      .pipe(take(1),
        tap(soppingCart => {
          this.shoppingCartSubject.next(soppingCart);
        }));
  }

  removeProductFromShoppingCart(productId: string): Observable<ShoppingCart> {
    const params = {
      id: this.shoppingCartSubject.getValue().shopId,
      productId
    };
    return this.httpClient.delete<ShoppingCart>('http://localhost:3000/deleteProduct', { params })
      .pipe(take(1),
        tap(soppingCart => {
          this.shoppingCartSubject.next(soppingCart);
        }));
  }

  updateProduct(productId: string, quantity: number): Observable<ShoppingCart> {
    const requestBody = {
      id: this.shoppingCartSubject.getValue().shopId,
      productId,
      quantity
    };

    return this.httpClient.put<ShoppingCart>('http://localhost:3000/updateProduct', requestBody)
      .pipe(take(1),
        tap(soppingCart => {
          this.shoppingCartSubject.next(soppingCart);
        }));
  }
}
