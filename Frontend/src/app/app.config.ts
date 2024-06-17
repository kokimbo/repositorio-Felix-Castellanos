import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
// import {JwtInterceptorService} from "./services/auth/interceptor/jwt-interceptor.service";
// import {ErrorInterceptorService} from "./services/auth/interceptorError/error-interceptor.service";
import {CookieService} from "ngx-cookie-service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    CookieService,
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
  ]
};
