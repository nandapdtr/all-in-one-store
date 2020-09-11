import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { map, filter } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  productsCount: number = 0;
  icon: string;
  inShoppingCartScreen: boolean;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('shopping-cart',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/shopping-cart.svg'));
    this.matIconRegistry.addSvgIcon('home',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/home.svg'));
    this.shoppingCartService.shoppingCart
      .pipe(map(shoppingCart => {
        return shoppingCart ? shoppingCart.products.length : 0;
      })).subscribe(productsCount => {
        this.productsCount = productsCount;
      });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        if (event.url === '/shopping-cart') {
          this.inShoppingCartScreen = true;
          this.icon = 'home';
        } else {
          this.icon = 'shopping-cart';
        }
      });
  }

  navigate() {
    if (this.inShoppingCartScreen) {
      this.inShoppingCartScreen = false;
      this.router.navigate(['']);
    } else {
      this.router.navigate(['shopping-cart']);
    }
  }
}
