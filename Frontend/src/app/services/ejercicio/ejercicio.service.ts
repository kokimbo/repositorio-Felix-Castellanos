import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../auth/authService/login.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {UserInterface} from "../user/user-interface";
import {environment} from "../../../environments/environment";
import {Ejercicio} from "../../modelos/ejercicio";

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(private http: HttpClient, private authService: LoginService, private router: Router) {}

  getEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(environment.urlApiUrl+"ejercicio").pipe(
      catchError(this.handleError)
    )
  }

  getEjercicio(id: string): Observable<Ejercicio> {
    //const headers = this.authService.headerWithToken;
    return this.http.get<Ejercicio>(environment.urlApiUrl+`ejercicio/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  saveEjercicio(ejercicio: FormData): Observable<Ejercicio> {
    const headers = this.authService.headerWithToken;
    return this.http.post<Ejercicio>(environment.urlApiUrl+`ejercicio`, ejercicio, {headers}).pipe(
      catchError(this.handleError)
    )
  }

  getCountEjercicios(id: string): Observable<number> {
    //const headers = this.authService.headerWithToken;
    return this.http.get<number>(environment.urlApiUrl+`ejercicio/count/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  removeEjercicio(id: string): Observable<void> {
    const headers = this.authService.headerWithToken;
    return this.http.delete<void>(environment.urlApiUrl+`ejercicio/${id}`, {headers}).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error('An error has occurred ', error.error);
    }else if(error.status==404){
      console.error('No se ha encontrado el ejercicio ', error.status, error.error)
    }else{
      console.error('El servidor mando el codigo de estado ', error.status, error.error)
    }
    return throwError(() => new Error('Algo ha fallado, intentelo de nuevo'));
  }
}
