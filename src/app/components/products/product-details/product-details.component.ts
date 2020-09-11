import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, Product } from '../products.service';
import { ShoppingCartService, ShoppingCart } from '../../../core/shopping-cart.service';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  proceedBtnText: string;
  addedToShoppingCart: boolean;

  private destroySubject = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params.id;
    this.product = this.productsService.getProduct(productId);
    this.shoppingCartService.shoppingCart
      .pipe(takeUntil(this.destroySubject))
      .subscribe(shoppingCart => {
        this.checkIfProductExistInShoppingCart(shoppingCart, productId);
      });
  }

  seeMoreProducts() {
    this.router.navigate(['products']);
  }

  addToCart() {
    if (!this.addedToShoppingCart) {
      this.shoppingCartService.addProductToShoppingCart(this.product.id, 1)
        .pipe(take(1))
        .subscribe(() => {
          alert('product added to cart succesfully');
        });
    } else {
      this.router.navigate(['shopping-cart']);
    }
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }

  private checkIfProductExistInShoppingCart(shoppingCart: ShoppingCart, productId: string) {
    this.addedToShoppingCart = !!shoppingCart.products.find(p => p.id == productId);
    this.proceedBtnText = this.addedToShoppingCart ? 'Go to cart' : 'Add to cart';
  }

}
