import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{

  constructor(private userService : UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    let header = req.headers.set('authorization' ,
     this.userService.getToken())
    let r = req.clone({
      headers : header
    })
    console.log(r);
    return next.handle(r)
  }
}
