import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreComponent } from './components/store/store.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component'
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminDashboardCardComponent } from './components/admin/admin-dashboard-card/admin-dashboard-card.component';
import { ChartsModule } from 'ng2-charts';
import { HeaderInterceptorService } from './interceptor/header-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StoreComponent,
    FilterComponent,
    ProductCardComponent,
    UserOrdersComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    ProductQuantityComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminNewProductComponent,
    AdminCustomersComponent,
    AdminDashboardCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule , 
    HttpClientModule,
    ModalModule.forRoot(), ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
