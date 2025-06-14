
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../pages/users.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://684c2a50ed2578be881dec31.mockapi.io/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === email))
    );
  }
}

