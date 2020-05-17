import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { UserAuthGuardService } from './auth-guard/user-auth-guard.service';
import { AdminAuthGuardService } from './auth-guard/admin-auth-guard.service';


const routes: Routes = [
  {
    path: '',
    canActivate: [UserAuthGuardService],
    component: HomeComponent
  },
  {
    path: 'home',
    canActivate: [UserAuthGuardService],
    component: HomeComponent
  },
  {
    path: 'orders',
    canActivate: [UserAuthGuardService],
    component: UserOrdersComponent
  },
  {
    path: 'cart',
    canActivate: [UserAuthGuardService],
    component: CartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [UserAuthGuardService , AdminAuthGuardService ],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'orders',
        component: AdminOrdersComponent
      },
      {
        path: 'products',
        component: AdminProductsComponent
      },
      {
        path: 'new-product',
        component: AdminNewProductComponent
      },
      {
        path: 'customers',
        component: AdminCustomersComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
