import {Inject, Injectable} from '@angular/core';
import {LoginInterface} from "./login-interface";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError, BehaviorSubject, tap, map} from "rxjs";
import {UserInterface} from "../../user/user-interface";
import {environment} from "../../../../environments/environment";
import {DOCUMENT} from "@angular/common";
import {RegistroInterface} from "./registro-interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentSession: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  currentSessionData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  // constructor(private http: HttpClient) {
  //   this.currentSession = new BehaviorSubject<Boolean>(sessionStorage.getItem('token')!=null);
  //   this.currentSessionData = new BehaviorSubject<String>(sessionStorage.getItem('token') || '');
  // }

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
    const sessionStorage = document.defaultView?.sessionStorage;

    if(sessionStorage) {
      this.currentSession = new BehaviorSubject<Boolean>(sessionStorage.getItem('token')!=null);
      this.currentSessionData = new BehaviorSubject<String>(sessionStorage.getItem('token') || '');
    }
  }

  login(login: LoginInterface) : Observable<any>{
    return this.http.post<any>(environment.urlHost+'/auth/login', login).pipe(
      tap((userData) => {
        if(userData && userData.token != null){
          sessionStorage.setItem('token', userData.token);
          this.currentSessionData.next(userData.token);
          this.currentSession.next(true);
        }
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  registro(registro: RegistroInterface){
    return this.http.post<any>(environment.urlHost+'/auth/register', registro).pipe(
      tap((userData) => {
        sessionStorage.setItem('token', userData.token)
        this.currentSessionData.next(userData.token);
        this.currentSession.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(){
    sessionStorage.removeItem('token');
    this.currentSessionData.next('');
    this.currentSession.next(false)
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error('Ha ocurrido un error', error.error);
    }else if (error.status===400){
      return throwError(() => new Error('Usuario o contraseña incorrectos'));
    }else if (error.status===406){
      return throwError(() => new Error('El email o el username ya estan registrados, inicie sesion'));
    }
    return throwError(() => new Error('Algo ha fallado, intentelo de nuevo'));
  }

  get sessionData():Observable<String>{
    return this.currentSessionData.asObservable()
  }

  get session():Observable<Boolean>{
    return this.currentSession.asObservable()
  }

  get userToken():String{
    return this.currentSessionData.value;
  }
}
