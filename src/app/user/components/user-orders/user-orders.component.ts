import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Order } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders : Order[] = [];
  constructor(private orderService : OrderService ) { }
  apiUrl = environment.apiUrl
  ngOnInit(): void {
    this.collectOrders()
  }


  collectOrders(){
      this.orderService.getUserOrders()
      .subscribe({
        next : (orders)=>{
          console.log(orders);
          this.orders = orders
          
        }
      })
  }

}
