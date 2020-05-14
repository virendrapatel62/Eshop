import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getAllProductUrl = 'http://localhost/api/products'
  constructor(private http : HttpClient , private userService : UserService) { }

  getAllProducts(){
    return this.http.get(this.getAllProductUrl ,
       {
         headers : {
            'authorization' : this.userService.getToken()
         }
      })
      .pipe(
        map((result : {count : number , products : Product[]})=>{
          return result.products
        })
      )
      
  }

  getProductById(id : string){
    return this.http.get(`${this.getAllProductUrl}/${id}` ,
       {
         headers : {
            'authorization' : this.userService.getToken()
         }
      })
      .pipe(
        map(( result)=>{
          return <Product>result
        })
      )
      
  }
}
