import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  numberOfItems : number = 0 ;
  isLoggedIn = false;
  isAdmin$
  constructor(private cartService : CartService ,
    private router : Router, 
    private userService : UserService) { }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next : (cart)=>{
        console.log(cart);
        this.numberOfItems = Object.keys(cart).length
        
      }
    })


    

    this.userService.loginObservable.subscribe(
      {
        next : ()=>{

          let token = this.userService.getToken();
          if(token!= ''){
            this.cheakAdmin()
            this.isLoggedIn = true;
          }else{
            this.isLoggedIn = false;
          }
          console.log(this.isLoggedIn);
          
        }
      }
    )
  }

  cheakAdmin(){
    // cheak user is admin or not 
    this.isAdmin$ = this.userService.isAdmin()

  }


  logout(){
    // alert('')
    this.userService.logout()
    this.router.navigate(['login'])
  }
}
