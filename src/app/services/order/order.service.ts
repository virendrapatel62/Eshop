import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderPlaceUrl = 'http://localhost/api/orders'
  userAllOrdersUrl = 'http://localhost/api/orders'
  constructor(private http : HttpClient , private userService : UserService ) { }

  placeOrder(orderInfo : OrderInfo){
    let headers = new HttpHeaders({
      'authorization' : this.userService.getToken()
    })
    return this.http.post(this.orderPlaceUrl , orderInfo , {headers} )
  }
  
  getUserOrders(all ?: boolean ){
    let url = this.userAllOrdersUrl;
    if(all){
      url = url + '?all=true'
    }
    let headers = new HttpHeaders({
      'authorization' : this.userService.getToken()
    })
    return this.http.get(url, {headers} ).pipe(
      map((result : {count : number , orders : Order[]})=>{
        return result.orders
      }
      )
    )
  }

  getAdminOrders(){
    return this.getUserOrders(true)
  }
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  address: string;
  products: ProductInfo[];
}

export interface ProductInfo {
  productId: string;
  quantity: number;
  price: number;
}
