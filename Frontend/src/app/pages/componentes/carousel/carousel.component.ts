import {Component, Input} from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import {StyleClassModule} from "primeng/styleclass";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [GalleriaModule, StyleClassModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() imagesEjer!: string[];

  images: any[] = [
    {
      itemImageSrc: 'assets/muerto.webp',
      thumbnailImageSrc: 'assets/muerto.webp',
      alt: 'Muerto',
      title: 'Muerto'
    },
    {
      itemImageSrc: 'assets/remo.jpg',
      thumbnailImageSrc: 'assets/remo.jpg',
      alt: 'Remo',
      title: 'Remo'
    },
    {
      itemImageSrc: 'assets/fondos.jpg',
      thumbnailImageSrc: 'assets/fondos.jpg',
      alt: 'Fondos',
      title: 'Fondos'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() {}

  ngOnInit() {}
}
