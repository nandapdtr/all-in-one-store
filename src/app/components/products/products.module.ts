import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from '../../material.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsService } from './products.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
