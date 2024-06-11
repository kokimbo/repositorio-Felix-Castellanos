import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UserInterface} from "./user-interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(environment.urlApiUrl+"user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(data: UserInterface): Observable<any> {
    return this.http.put<UserInterface>(environment.urlApiUrl+"user", data).pipe()
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error('An error has occurred ', error.error);
    }else{
      console.error('El servidor mando el codigo de estado ', error.status, error.error)
    }
    return throwError(() => new Error('Algo ha fallado, intentelo de nuevo'));
  }

}
