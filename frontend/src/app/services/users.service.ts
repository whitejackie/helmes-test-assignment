import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  submitForm(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  updateForm(id: number, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/users/${id}`, user);
  }
}
