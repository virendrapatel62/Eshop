import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{

  constructor(private userService : UserService , 
    private message : NotificationService , private zone : NgZone) { }
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
        (err)=>{
          this.zone.run(()=>{
            this.message.show("SOmething Went Wrong..")
          })
          
          return throwError(err)
        }
      )
    )
  }
}
