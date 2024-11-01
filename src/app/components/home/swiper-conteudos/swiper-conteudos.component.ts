import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper-conteudos',
  templateUrl: './swiper-conteudos.component.html',
  styleUrls: ['./swiper-conteudos.component.scss'],
})
export class SwiperConteudosComponent implements OnInit {
  @Input() list: Array<any> | undefined = [];
  @Input() enableBtnInit: boolean | undefined = false;
  @Input() titleBtnInit: String | undefined = '';
  @Output() clickInitBtn: EventEmitter<any> = new EventEmitter();
  @Output() clickItem: EventEmitter<any> = new EventEmitter();
  isMobile: boolean = this.platfom.is('mobile');
  swiperOptions: SwiperOptions = {
    pagination: false,
  };

  constructor(
    private platfom: Platform
  ) {}

  ngOnInit() {}

  onClickInitBtn() {
    this.clickInitBtn.emit(true);
  }

  onClickItem(ev: any) {
    this.clickItem.emit(ev);
  }
}
