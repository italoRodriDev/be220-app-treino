import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { register } from 'swiper/element/bundle';
import { SwiperFotosComponent } from './bem-vindo/swiper-fotos/swiper-fotos.component';
import { SwiperSalaTrofeusComponent } from './bem-vindo/swiper-sala-trofeus/swiper-sala-trofeus.component';
import { SwiperConteudosComponent } from './home/swiper-conteudos/swiper-conteudos.component';
import { SwiperPersonalOnlineComponent } from './home/swiper-personal-online/swiper-personal-online.component';
import { SwiperProgramasComponent } from './home/swiper-programas/swiper-programas.component';
import { AnimationListComponent } from './utils/animation-list/animation-list.component';
import { SkeletonListComponent } from './utils/skeleton-list/skeleton-list.component';

register();

@NgModule({
  declarations: [
    SkeletonListComponent,
    AnimationListComponent,
    SwiperPersonalOnlineComponent,
    SwiperProgramasComponent,
    SwiperConteudosComponent,
    SwiperFotosComponent,
    SwiperSalaTrofeusComponent,
  ],
  imports: [CommonModule, LazyLoadImageModule],
  exports: [
    SkeletonListComponent,
    AnimationListComponent,
    SwiperPersonalOnlineComponent,
    SwiperProgramasComponent,
    SwiperConteudosComponent,
    SwiperFotosComponent,
    SwiperSalaTrofeusComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedComponentsModule {}
