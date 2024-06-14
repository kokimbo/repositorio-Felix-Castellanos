import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "../../services/auth/authService/login.service";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private loginService: LoginService, private router: Router) {
    if (!loginService.isAuthenticated()){
      router.navigate(['/login']);
    }
  }


}
