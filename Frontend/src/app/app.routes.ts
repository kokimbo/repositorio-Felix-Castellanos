import { Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";
import {loginGuard} from "./services/auth/guards/login.guard";
import {landingGuard} from "./services/auth/guards/landing.guard";
import {UserPageComponent} from "./pages/user-page/user-page.component";

export const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'home', title: 'DashBoard', component: DashboardComponent},
  {path: 'login', title: 'GymBear Login', component: LoginComponent},
  {path: 'registro', title: 'GymBear Registro', component: RegistroComponent},
  {path: 'landing', title: 'landing', component: LandingComponent},
  {path: 'userPage', title: 'userPage', component: UserPageComponent}
];
