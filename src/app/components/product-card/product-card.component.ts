import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {


  @Input('product')
  product : Product;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    console.log(this.product);
    
  }
  addToCart(){
    console.log(this.product);
    this.cartService.addToCart(this.product)
    
  }

}
