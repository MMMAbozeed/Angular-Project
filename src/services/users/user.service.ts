import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

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
    return this.http.get(this.DB_URL + "/" + id);
  }
  AddUser(user: User) {
    return this.http.post(this.DB_URL, user);
  }
}
