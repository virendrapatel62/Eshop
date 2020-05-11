import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : HTMLFormElement
  constructor() { }

  ngOnInit(): void {
  }

  login(event : Event){
    event.preventDefault();
    this.form = <HTMLFormElement>event.target
    this.readFormValues();
  }

  readFormValues(){
    let email = (<HTMLInputElement>
                  this.form.elements.namedItem('email')).value
    let password = (<HTMLInputElement>
                    this.form.elements.namedItem('password')).value;
    
    let creadentials = {
      email , password
    }

    console.log(creadentials);
    
    

  }
}
