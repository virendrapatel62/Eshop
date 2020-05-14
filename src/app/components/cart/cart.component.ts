import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product/product.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface CartItem {
  product: Product
  quantity: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart;
  cartItems: CartItem[];

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {
      this.subcribeCart()
  }


  subcribeCart() {
    this.cartService.cartObservable.subscribe(
      {
        next: (cart) => {
          this.cartItems = [];
          let observables = []
          for (let id in cart) {
            console.log(id);
            observables.push(
              this.productService.getProductById(id)
                .pipe(
                  map(product => {
                    let item: CartItem = {
                      product: product,
                      quantity: cart[id]
                    }
                    return item
                  })
                )
            )
          }

          forkJoin(observables).subscribe({
            next: (cartItems: CartItem[]) => {

              this.cartItems = cartItems
            }
          })
        }
      }
    )
  }
  

}
