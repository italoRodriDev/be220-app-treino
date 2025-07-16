import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper-fotos',
  templateUrl: './swiper-fotos.component.html',
  styleUrls: ['./swiper-fotos.component.scss'],
})
export class SwiperFotosComponent implements OnInit {
  @Input() list: Array<any> | undefined = [];
  @Input() enableBtnInit: boolean | undefined = false;
  @Input() titleBtnInit: String | undefined = '';
  isMobile: boolean = this.platfom.is('mobile');
  swiperOptions: SwiperOptions = {
    pagination: false,
    autoplay: true,
  };

  constructor(private platfom: Platform) {}

  ngOnInit() {}
}
