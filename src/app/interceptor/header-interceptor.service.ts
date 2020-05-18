import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{

 
  constructor(private userService : UserService , 
    private message : NotificationService , 
    private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   
    let header = req.headers.set('authorization' ,
     this.userService.getToken())
    let r = req.clone({
      headers : header
    })
    console.log(r);
    return next.handle(r).pipe(
      map(result=>{
        console.log(result);
        return result;
      }), 
      catchError(
        (err : HttpErrorResponse)=>{
            this.showProperMessage(err)
          return throwError(err)
        }
      )
    )
  }


  showProperMessage(err : HttpErrorResponse){
    console.log(this.router.url);
    
    if(this.router.url.includes('login')){
      this.message.show('Invalid Email Or Password !!')
      return 
    }

    if(err.status == 401){
      this.message.show('Session Expired.. Please Login Again !!')
      this.router.navigate(['login'] , {
        queryParams : {
          'returnUrl' : this.router.url
        }
      })
      return 
    }
   
  }


}
