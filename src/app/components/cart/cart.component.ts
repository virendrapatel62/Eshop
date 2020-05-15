import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product/product.service';
import { forkJoin, Subscription } from 'rxjs';
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
  total = 0
  cartItems: CartItem[] = [];
  cartSubscription: Subscription;

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {
    this.subcribeCart()
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe()
  }
  subcribeCart() {
    let total = 0;
    this.cartSubscription = this.cartService.cartObservable.subscribe(
      {
        next: (cart) => {
          console.log(cart);
          let observables = []
          total = 0;
          if (Object.keys(cart).length == 0) {
            this.cartItems = []
          }
          for (let id in cart) {
            observables.push(
              this.productService.getProductById(id)
                .pipe(
                  map(product => {
                    total += (product.price * cart[id])
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
              this.total = total;
              this.cartItems = cartItems
            }
          })
        }
      }
    )
  }


}
