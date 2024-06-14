import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "../authService/login.service";
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  // Si está autenticado, permite la navegación a la ruta solicitada.
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Si no está autenticado, redirige al usuario a la página de login.
    router.navigate(['/login']);
    return false;
  }
};
