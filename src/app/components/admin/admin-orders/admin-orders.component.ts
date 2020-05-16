import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$ : Observable<Order[]>;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.collectOrders()
  }

  collectOrders(){
    this.orders$ = this.orderService.getAdminOrders()
  }

  changeStatus(status : string , order :Order){
    this.orderService.changeStatus({status : status} , order._id)
    .subscribe({
      next : result=>{
        console.log(result);
        order.status = status
        
      }
    })
  }

}
