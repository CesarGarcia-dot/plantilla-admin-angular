import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //direccion de la api
  baseUrl = environment.apiUrl;
  userUrl = 'https://jsonplaceholder.typicode.com/photos?_start=0&_limit=6';

  //declaracion de Http Client para traer datos
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.baseUrl).pipe(
      map(res => res["payload"])
    );
  }

  //metodo para traer datos que funciono con mat table de angular material
  getUsers2(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  //metodo para traer usuarios con fotos
  getUsersPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.userUrl);
  }
  // metodo para aplicar paginacion y enviar datos de filtros 
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
