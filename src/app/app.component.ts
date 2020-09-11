import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './core/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'all-in-one-store';

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.shoppingCartService.initShoppingCart();
  }
}
