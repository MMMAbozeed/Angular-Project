import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  DB_URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  GetAllUsers() {
    return this.http.get(this.DB_URL);
  }
  GetUserById(id: number) {
    return this.http.get(this.DB_URL  + "?id=" + id);
  }
  AddUser(user: any) {
    return this.http.post(this.DB_URL , user);
  }
  editUser(user:any){
    return this.http.put(this.DB_URL  + "?id=" +user.id,user)
  }
}
