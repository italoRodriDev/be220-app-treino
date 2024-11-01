import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlunoModel } from 'src/app/models/aluno.model';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper-personal-online',
  templateUrl: './swiper-personal-online.component.html',
  styleUrls: ['./swiper-personal-online.component.scss'],
})
export class SwiperPersonalOnlineComponent implements OnInit {
  @Input() list: Array<AlunoModel> | undefined = [];
  @Input() enableBtnInit: boolean | undefined = false;
  @Input() titleBtnInit: String | undefined = '';
  @Output() clickInitBtn: EventEmitter<any> = new EventEmitter();
  @Output() clickItem: EventEmitter<any> = new EventEmitter();
  @Output() clickRemove: EventEmitter<any> = new EventEmitter();
  isMobile: boolean = this.platfom.is('mobile');
  swiperOptions: SwiperOptions = {
    pagination: false,
  };

  constructor(private platfom: Platform) {}

  ngOnInit() {}

  onClickInitBtn() {
    this.clickInitBtn.emit(true);
  }

  onClickItem(ev: AlunoModel) {
    this.clickItem.emit(ev);
  }

  onClickRemove(ev: AlunoModel) {
    this.clickRemove.emit(ev);
  }
}
