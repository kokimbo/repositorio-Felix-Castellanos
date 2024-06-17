import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "../../services/auth/authService/login.service";
import {CarouselComponent} from "../componentes/carousel/carousel.component";
import {DataViewComponent} from "../componentes/data-view/data-view.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CarouselComponent,
    DataViewComponent
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

  }


}
