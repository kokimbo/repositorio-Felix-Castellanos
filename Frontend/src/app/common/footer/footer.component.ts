import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
