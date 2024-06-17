import { Routes } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import {EjercicioPageComponent} from "./pages/ejercicio-page/ejercicio-page.component";
import {NewEjercicioComponent} from "./pages/new-ejercicio/new-ejercicio.component";

export const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'login', title: 'GymBear Login', component: LoginComponent},
  {path: 'registro', title: 'GymBear Registro', component: RegistroComponent},
  {path: 'landing', title: 'landing', component: LandingComponent},
  {path: 'userPage', title: 'User page', component: UserPageComponent},
  {path: 'ejercicioPage/:id', title: 'Ejercicio page', component: EjercicioPageComponent},
  {path: 'ejercicioPage', title: 'Ejercicio page', component: EjercicioPageComponent},
  {path: 'newEjercicio', title: 'Nuevo ejercicio', component: NewEjercicioComponent},
];
