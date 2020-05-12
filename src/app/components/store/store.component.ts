import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.collectProducts()
  }

  collectProducts(){
    this.productService.getAllProducts()
    .subscribe({
      next : (result)=>{
        console.log(result);
      } , 
      error: (error)=>{
        console.log(error);
        
      }
    })
  }


}
