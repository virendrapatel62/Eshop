import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart  = {};
  constructor() { 
    if(!this.isCartExists())
      localStorage.setItem('cart' , JSON.stringify(this.cart));
  }

  addToCart(product : Product){
    // localStorage.setItem()
  }

  isCartExists(){
    if(localStorage.getItem('cart')){
      return true
    }else{
      return false
    }
  }


  removeFromCart(product : Product){

  }
}
