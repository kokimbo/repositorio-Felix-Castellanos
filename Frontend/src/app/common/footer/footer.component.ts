import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    DataViewModule, ButtonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
