import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = 'http://localhost/api/products'
  constructor(private http: HttpClient, private userService: UserService) { }

  getAllProducts(params) {
    let query = new URLSearchParams();


    if (params['category']) {
      query.append('category', params['category'])
    }

    if (params['min']) {
      query.append('min', params['min'])
    }

    if (params['max']) {
      query.append('max', params['max'])
    }
    console.log(query.toString());


    return this.http.get(`${this.productUrl}?${query.toString()}`,
      {
        headers: {
          'authorization': this.userService.getToken()
        }
      })
      .pipe(
        map((result: { count: number, products: Product[] }) => {
          return result.products
        })
      )

  }

  // get producy by ID
  getProductById(id: string) {
    return this.http.get(`${this.productUrl}/${id}`,
      {
        headers: {
          'authorization': this.userService.getToken()
        }
      })
      .pipe(
        map((result) => {
          return <Product>result
        })
      )

  }

  // saveing product
  // get producy by ID
  saveProduct(data : FormData) {
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    console.log(this.userService.getToken());
    console.log(headers.get('authorization'));
    
    return this.http.post(this.productUrl, data , 
      {
        headers
      })
      .pipe(
        map((result : {message : string , product : Product}) => {
          return <Product>result.product
        })
      )

  }


  // update 
  updateProduct(data , id) {
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    
    
    return this.http.patch(this.productUrl + '/' + id, data , 
      {
        headers
      })
  }

}



