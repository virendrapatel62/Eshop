import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSignupUrl = "http://localhost/api/users/signup";
  private userLoginUrl = "http://localhost/api/users/login";
  constructor(private http : HttpClient) { }


  private saveTokenToLocalStorage(token : string){
    localStorage.setItem('token' , "Bearer "+ token)
  }

  getToken(){
    return localStorage.getItem('token') ? localStorage.getItem('token') : "";
  }

  signup(user : User){
     return this.http.post(this.userSignupUrl , user)
     .pipe(
       map(result=>{
          return <{message : string}>result
       })
     )
  }
  login(credentials : {email : string , password : string}){
     return this.http.post(this.userLoginUrl , credentials)
     .pipe(
       map((result : loginResponce)=>{
         this.saveTokenToLocalStorage(result.token)
         return result
       })
     )
  }
}


interface loginResponce{
  token : string , 
  message : string
}