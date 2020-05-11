import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error : string ;
  success : string;
 
  constructor(private userService: UserService ) { }

  ngOnInit(): void {
  }

  signup(event: Event) {
    event.preventDefault();
    console.log(event.target);
    let form = <HTMLFormElement>event.target
    let name = (<HTMLInputElement>form.elements.namedItem('name')).value
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value
    let password = (<HTMLInputElement>form.elements.namedItem('password')).value
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value

    let user: User = {
      name,
      email,
      password,
      phone
    };

    console.log({
      user
    });

    this.userService.signup(user).subscribe(
      {
        next : (result : {message: string})=>{
          console.log(result);
          this.success  = result.message
          this.error = undefined
          form.reset();
        }, 
        error : (responce : HttpErrorResponse)=>{
            console.log(responce);
            this.error = responce.error.error.message
            this.success = undefined
        }
      }
    )
  }

}
