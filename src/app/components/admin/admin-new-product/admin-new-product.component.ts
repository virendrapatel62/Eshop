import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css']
})
export class AdminNewProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveCategory(categoryForm : HTMLFormElement){
    let title = (<HTMLInputElement>categoryForm.elements.namedItem('title')).value
    console.log({title});
    
  }
  saveProduct(productForm){
    let name = (<HTMLInputElement>productForm.elements.namedItem('name')).value
    let price = (<HTMLInputElement>productForm.elements.namedItem('price')).value
    let category = (<HTMLSelectElement>productForm.elements.namedItem('category')).value
    let productImage = (<HTMLInputElement>productForm.elements.namedItem('productImage')).files[0]
    
    let values = {
      name , price , category , productImage
    }

    console.log(values);
    
  }
}
