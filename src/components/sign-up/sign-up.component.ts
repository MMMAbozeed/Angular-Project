import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import {  Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  providers:[UserService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

name:any
email:any
password:any
phone:any
address:any
imgUrl:any
clicked=false
constructor(private userS:UserService, private router:Router){

}
  signUp = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),
    phone: new FormControl("", [Validators.required, Validators.minLength(11)]),
    address: new FormControl("", [Validators.required]),
    imgUrl: new FormControl("", []),
  });
  validation(){
    this.clicked=true
    if(this.isValid)
    {
      let user ={name:this.name,email:this.email,password:this.password,phone:this.phone,img:this.imgUrl,address:this.address}
      this.userS.AddUser(user).subscribe()
      localStorage.setItem('userSession', JSON.stringify(user));
      this.router.navigate([''])
    }
  }
get isValid()
{
  return this.signUp.valid
}
}
