import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './common/footer/footer.component';
import { PrimeNGConfig } from 'primeng/api';
import {HeaderComponent} from "./common/header/header.component";
import {LandingComponent} from "./pages/landing/landing.component";
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, LandingComponent, RouterLink, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';

  private primengConfig: PrimeNGConfig;

  constructor(primengConfig: PrimeNGConfig) {
    this.primengConfig = primengConfig;
  }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
