import { Inject, Injectable } from '@angular/core';
import { LoginInterface } from "./login-interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from "rxjs";
import { UserInterface } from "../../user/user-interface";
import { environment } from "../../../../environments/environment";
import { RegistroInterface } from "./registro-interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentSession: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  sessionToken: BehaviorSubject<String> = new BehaviorSubject<String>('');
  sessionUser: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);



  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {

    if (cookieService.get('token')) {
      this.currentSession = new BehaviorSubject<Boolean>(!!cookieService.get('token') != null);
      this.sessionToken = new BehaviorSubject<String>(cookieService.get('token') || '');
      const userString = cookieService.get('user');
      let user: UserInterface | null = null;

      if (userString) {
        try {
          user = JSON.parse(userString) as UserInterface;
        } catch (e) {
          console.error('Error parsing user from sessionStorage', e);
        }
      }
      this.sessionUser = new BehaviorSubject<UserInterface | null>(user);
    }
  }

  login(login: LoginInterface): Observable<any> {
    return this.http.post<any>(environment.urlHost + '/auth/login', login).pipe(
      tap((userData) => {
        if (userData && userData.token != null) {
          const expiresAt = new Date(new Date().getTime() + 86400000);
          this.cookieService.set('token', userData.token, expiresAt);
          this.cookieService.set('user', JSON.stringify(userData.userSession));
          this.sessionToken.next(userData.token);
          this.currentSession.next(true);
          this.sessionUser.next(userData.userSession);
        }
      }),
      catchError(this.handleError)
    );
  }

  registro(registro: RegistroInterface | any): Observable<any> {
    return this.http.post<any>(environment.urlHost + '/auth/register', registro).pipe(
      tap((userData) => {
        const expiresAt = new Date(new Date().getTime() + 86400000);
        this.cookieService.set('token', userData.token, expiresAt);
        this.cookieService.set('user', JSON.stringify(userData.userSession));
        this.sessionToken.next(userData.token);
        this.currentSession.next(true);
        this.sessionUser.next(userData.userSession);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    this.sessionToken.next('');
    this.currentSession.next(false);
    this.sessionUser.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ha ocurrido un error', error.error);
    } else if (error.status === 400) {
      return throwError(() => new Error('Usuario o contraseña incorrectos'));
    } else if (error.status === 406) {
      return throwError(() => new Error('El email o el username ya están registrados, inicie sesión'));
    }
    return throwError(() => new Error('Algo ha fallado, inténtelo de nuevo'));
  }

  get sessionData(): Observable<String> {
    return this.sessionToken.asObservable();
  }

  get getTokenCookies(): String {
    return this.cookieService.get('token');
  }

  get session(): Observable<Boolean> {
    return this.currentSession.asObservable();
  }

  isAuthenticated():boolean{
    const token = this.getTokenCookies;
    //El !! convierte ese valor a booleano hace lo mismo que un ternario
    return !!token;
  }

  get userToken(): String {
    return this.sessionToken.value;
  }
}
