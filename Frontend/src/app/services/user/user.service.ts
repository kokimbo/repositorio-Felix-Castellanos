import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {UserInterface} from "./user-interface";
import {environment} from "../../../environments/environment";
import {LoginService} from "../auth/authService/login.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: LoginService, private router: Router) { }


  deleteUser(username: string): Observable<any> {
    return this.http.delete<UserInterface>(environment.urlApiUrl+`user/${username}` ).pipe(
      tap((userData) => {
        this.authService.logout();
        this.router.navigate(["/login"])
      }),
      catchError(this.handleError)
    )
  }



  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error('An error has occurred ', error.error);
    }else if(error.status==404){
      console.error('No se ha encontrado el usuario ', error.status, error.error)
    }else{
      console.error('El servidor mando el codigo de estado ', error.status, error.error)
    }
    return throwError(() => new Error('Algo ha fallado, intentelo de nuevo'));
  }

}
