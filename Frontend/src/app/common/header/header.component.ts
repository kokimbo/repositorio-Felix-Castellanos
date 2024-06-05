import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, NgOptimizedImage, NgStyle, RouterLink, AvatarModule, BadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLogged: boolean = false;

}
