import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Swiper, SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper-sala-trofeus',
  templateUrl: './swiper-sala-trofeus.component.html',
  styleUrls: ['./swiper-sala-trofeus.component.scss'],
})
export class SwiperSalaTrofeusComponent implements OnInit {
  @Input() list: Array<any> | undefined = [];
  @Input() enableBtnInit: boolean | undefined = false;
  @Input() titleBtnInit: String | undefined = '';
  isMobile: boolean = this.platfom.is('mobile');
  swiperOptions: SwiperOptions = {
    pagination: false,
    autoplay: true,
    loop: true,
  };

  constructor(private platfom: Platform) {}

  ngOnInit() {}
}
