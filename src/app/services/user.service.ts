import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.baseUrl).pipe(
      map(res => res["payload"])
    );
  }

  getUsers2():  Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }


  findUsers(
    courseId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<User[]> {

    return this.http.get(this.baseUrl, {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map(res => res["payload"])
    );
  }

}
