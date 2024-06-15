import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "../../services/auth/authService/login.service";
import {CarouselComponent} from "../componentes/carousel/carousel.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CarouselComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit{

  constructor(private loginService: LoginService, private router: Router) {
    if (!loginService.isAuthenticated()){
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (!this.loginService.isAuthenticated()){
      this.router.navigate(['/login']);
    }

    //Hacer el servicio para que vengan todos los ejercicios y mostrarlos en el dataview (copiar del footer) -> prime ng

  }


}
