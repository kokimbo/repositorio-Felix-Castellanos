import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {LoginService} from "../authService/login.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private cookieService: CookieService)  {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: String = this.cookieService.get('token');

    if(token){
      req=req.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
    }
    return next.handle(req);
  }
}
