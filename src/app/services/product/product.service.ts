import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getAllProductUrl = 'http://localhost/api/products'
  constructor(private http : HttpClient) { }

  getAllProducts(){
    return this.http.get(this.getAllProductUrl ,
       {
         headers : {
            'authorization' : "Bearer" + " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpcmVuZHJhQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVlYjhmZjBlYTAxNDY1NmFiODRkZTQ3MiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU4OTI1NjY4MCwiZXhwIjoxNTg5MjYwMjgwfQ.c7iYl6uro5KT1N-gGJulQ3ihOh9DZah7FDYnoo9UBjA"
         }
      })
  }
  
}
