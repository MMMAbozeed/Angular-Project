import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import {  Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  providers:[UserService],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
name:any
id:any
email:any
password:any
phone:any
address:any
imgUrl:any
clicked=false
userSession: any;
constructor(private userS:UserService, private router:Router){
  this.loadUserSession()
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
    console.log("idddddddddd",this.id)
    if(this.isValid)
    {
      let user ={id:this.id,username:this.name,email:this.email,password:this.password,phone:this.phone,img:this.imgUrl,address:this.address}
      this.userS.editUser(user).subscribe(
        (d)=>{console.log(d)},
        (e)=>{console.log(e)},
      )
      localStorage.setItem('userSession', JSON.stringify(user));
      this.router.navigate([''])
    }
  }
get isValid()
{
  return this.signUp.valid
}
loadUserSession() {
  const userSessionStr = localStorage.getItem('userSession');

  if (userSessionStr) {
    try {
      this.userSession = JSON.parse(userSessionStr);
      this.imgUrl = this.userSession.img
      this.name = this.userSession.username
      this.address = this.userSession.address
      this.email = this.userSession.email
      this.password = this.userSession.password
      this.phone = this.userSession.phone
      this.id =this.userSession.id
      console.log(this.imgUrl)
      console.log(this.userSession); // Now you can use this.userSession in your component
    } catch (error) {
      console.error('Error parsing user session from localStorage', error);
    }
  } else {
    console.log('No user session found in localStorage.');
  }
}
}
