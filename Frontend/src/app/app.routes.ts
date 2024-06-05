import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";

export const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'home', title: 'DashBoard', component: DashboardComponent},
  {path: 'login', title: 'GymBear Login', component: LoginComponent},
  {path: 'registro', title: 'GymBear Registro', component: RegistroComponent},
  {path: 'landing', title: 'landing', component: LandingComponent},


  // Esto de aqui comentado tiene que ir abajo de todas las rutas, y se implementa para controlar si el recurso al
  // que se accede no existe. Un 404 de to la vida de dios, cuando se accede a una ruta que no existe en la aplicacion.

  // {
  //   path: '**',
  //   title: 'Error 404',
  //   component: DashboardComponent,
  // },
];
