import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingCartService } from '../core/shopping-cart.service';
import { Product } from '../components/products/products.service';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  products: Product[];
  totalPrice: number;
  currencyCode: string;

  private destroySubject = new Subject();

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.shoppingCart
      .pipe(takeUntil(this.destroySubject))
      .subscribe(shoppingCart => {
        this.products = shoppingCart.products;
        this.totalPrice = this.getTotalPrice(shoppingCart.products);
        this.currencyCode = this.getCurrencyCode(shoppingCart.products);
      });
  }

  deleteProduct(productId: string) {
    this.shoppingCartService.removeProductFromShoppingCart(productId)
      .pipe(take(1))
      .subscribe(() => {
        alert('Product Removed Succesfully');
      });
  }

  increaseQuantity(product: Product) {
    this.updateProduct(product.id, product.quantity + 1);
  }

  decreaseQuantity(product: Product) {
    if (product.quantity === 1) {
      this.deleteProduct(product.id);
    } else {
      this.updateProduct(product.id, product.quantity - 1);
    }
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }

  private updateProduct(productId: string, quantity: number) {
    this.shoppingCartService.updateProduct(productId, quantity)
      .pipe(take(1))
      .subscribe(() => {
        alert('Cart Updated Succesfully');
      });
  }

  private getTotalPrice(products: Product[]): number {
    return products.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);
  }

  private getCurrencyCode(products: Product[]): string {
    if (products.length) {
      return products[0].currencyCode;
    }
    return undefined;
  }

}
