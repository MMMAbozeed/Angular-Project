import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnChanges {
  path:any
  userSessionStr:any
  showSetting=false
  userSession: any;
  imgUrl:any
  get isLogged()
  {
    if(localStorage.getItem('userSession'))
      return true
      else return false
  }
  constructor(private router:Router , private myRoute:ActivatedRoute)
  {
    this.loadUserSession()
  }
  loadUserSession(): void {
    const userSessionStr = localStorage.getItem('userSession');

    if (userSessionStr) {
      try {
        this.userSession = JSON.parse(userSessionStr);
        this.imgUrl = this.userSession.img
        console.log(this.imgUrl)
        console.log(this.userSession); // Now you can use this.userSession in your component
      } catch (error) {
        console.error('Error parsing user session from localStorage', error);
      }
    } else {
      console.log('No user session found in localStorage.');
    }
  }
  usrImg:any

  logOut(){
    localStorage.removeItem('userSession');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.loadUserSession()
    if(localStorage.getItem('userSession'))
      {
        this.showSetting=true
      }
      else
      {
        this.showSetting=false
      }
    this.path = this.myRoute.url
    console.log(this.router.url)
    console.log("path",this.path)
  }
  ngOnChanges(){
    this.loadUserSession()

  }
}
