import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule { }
