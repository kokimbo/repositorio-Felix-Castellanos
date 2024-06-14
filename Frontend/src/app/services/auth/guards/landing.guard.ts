import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "../authService/login.service";
import {inject} from "@angular/core";

export const landingGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  // Si está autenticado, permite la navegación a la ruta solicitada.
  if (authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  } else {
    // Si no está autenticado, redirige al usuario a la página de login.
    return true;
  }
};
