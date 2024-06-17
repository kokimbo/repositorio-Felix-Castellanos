import {Component, OnInit} from '@angular/core';
import {Ejercicio} from "../../modelos/ejercicio";
import {EjercicioService} from "../../services/ejercicio/ejercicio.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LoginService} from "../../services/auth/authService/login.service";
import {ButtonModule} from "primeng/button";
import {environment} from "../../../environments/environment";
import {BadgeModule} from "primeng/badge";
import {ChipModule} from "primeng/chip";
import {CarouselComponent} from "../componentes/carousel/carousel.component";

@Component({
  selector: 'app-ejercicio-page',
  standalone: true,
  imports: [
    ButtonModule,
    BadgeModule,
    ChipModule,
    CarouselComponent,
    RouterLink
  ],
  templateUrl: './ejercicio-page.component.html',
  styleUrl: './ejercicio-page.component.scss'
})
export class EjercicioPageComponent implements OnInit{
  ejercicio!: Ejercicio;

  constructor(private authService: LoginService, private router: Router, private route: ActivatedRoute, private ejercicioService: EjercicioService) {
    if (!authService.isAuthenticated()){
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ejercicioService.getEjercicio(id).subscribe(
        (data: Ejercicio) => {
          this.ejercicio = data;
        }
      );
    }
  }

  protected readonly environment = environment;
}
