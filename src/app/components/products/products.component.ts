import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from './products.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsService.fetchAllProducts();
  }

  seeProductDetails(id: string): void {
    this.router.navigate([`products/${id}`]);
  }

}
