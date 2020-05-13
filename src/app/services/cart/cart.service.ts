import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/products';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart  = {};
  private _cartObservable : BehaviorSubject<Object> ;
  constructor() { 
    if(!this.isCartExists())
      localStorage.setItem('cart' , JSON.stringify(this.cart));


    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart)
  }

  readCartDataFromLocalStorage(){
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  get cartObservable(){
    return this._cartObservable;
  }

  addToCart(product : Product){
    let quantity = this.cart[product._id];
    if(quantity){
      this.cart[product._id] =  (+quantity) + 1; 
    }else{
      this.cart[product._id] = 1;
    }
    // localStorage.setItem()

    this._cartObservable.next(this.cart);
    localStorage.setItem('cart' , JSON.stringify(this.cart));
  }

  isCartExists(){
    if(localStorage.getItem('cart')){
      return true
    }else{
      return false
    }
  }

  getQuantity(product: Product){
   return this.cart[product._id] ? +this.cart[product._id] : 0 
  }


  removeFromCart(product : Product){

  }
}
