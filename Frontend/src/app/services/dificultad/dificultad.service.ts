import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginService} from "../auth/authService/login.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Ejercicio} from "../../modelos/ejercicio";
import {environment} from "../../../environments/environment";
import {Dificultad} from "../../modelos/dificultad";

@Injectable({
  providedIn: 'root'
})
export class DificultadService {

  constructor(private http: HttpClient, private authService: LoginService, private router: Router) {}

  getDificultades(): Observable<Dificultad[]> {
    return this.http.get<Dificultad[]>(environment.urlApiUrl+"dificultad").pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error('An error has occurred ', error.error);
    }else if(error.status==404){
      console.error('No se ha encontrado la dificultad', error.status, error.error)
    }else{
      console.error('El servidor mando el codigo de estado ', error.status, error.error)
    }
    return throwError(() => new Error('Algo ha fallado, intentelo de nuevo'));
  }

}
