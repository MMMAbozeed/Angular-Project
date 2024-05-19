import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../../services/users/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,RouterLink,RouterModule,RouterLinkActive],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  clicked=false
  constructor(private userS: UserService, private router: Router) {}
  navigate(){
    this.router.navigate(['/signup'])
  }
  CheckUser() {
    this.clicked=true
    let userLists: any[] = [];
    this.userS.GetAllUsers().subscribe(
      (data: any) => {
        userLists = data;
        console.log(userLists)
        // Filter the data to find the user with the matching email and password
        const filteredData = userLists.filter(user => user.email === this.email && user.password === this.password);
        
        if (filteredData.length > 0) {
          // User found, store user session in local storage
          localStorage.setItem('userSession', JSON.stringify(filteredData[0]));
          console.log('User found:', filteredData[0]);
          // Redirect or perform any additional actions
          this.router.navigate(['/']);
        } else {
          // No user found
          this.errorMessage = 'No user found with the provided email and password.';
          console.log('No user found with the provided email and password.');
        }
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }

  logIn = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(4)])
  });
  get isValid()
  {
    return this.logIn.valid
  }
}
