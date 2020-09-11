import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ProductsModule } from './components/products/products.module';
import { CoreModule } from './core/core.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    ProductsModule,
    ShoppingCartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
