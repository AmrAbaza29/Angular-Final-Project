import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) {

   }
  private readonly DB_URL='https://jsonplaceholder.typicode.com/users/';
  private readonly DB_URL_ALBUMS='https://jsonplaceholder.typicode.com/albums?userId';
  private readonly DB_URL_PHOTOS='https://jsonplaceholder.typicode.com/photos?albumId';
   addEmployee(data:any):Observable<any>{
    return this._http.post(this.DB_URL,data);
   }
   getEmployeesList():Observable<any>{
    return this._http.get(this.DB_URL);
   }
   deleteEmployee(id:number):Observable<any>{
    return this._http.delete(this.DB_URL+id);
   }
   updateEmployee(id:number, data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/employees/${id}`,data);
   }
   GetEmployeeById(id:number){
    return this._http.get(this.DB_URL+id);
  }
   GetAlbumsById(id:number){
    return this._http.get(this.DB_URL_ALBUMS+'='+id);
  }
  GetPhotosById(id:number){
    return this._http.get(this.DB_URL_PHOTOS+'='+id);
  }
}
