import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '../interfaces/sector';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  private http = inject(HttpClient);

  getSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>('http://localhost:3000/sectors');
  }
}
