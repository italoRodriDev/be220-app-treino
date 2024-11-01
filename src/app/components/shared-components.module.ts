import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { register } from 'swiper/element/bundle';
import { AnimationListComponent } from './animation-list/animation-list.component';
import { SwiperConteudosComponent } from './home/swiper-conteudos/swiper-conteudos.component';
import { SwiperPersonalOnlineComponent } from './home/swiper-personal-online/swiper-personal-online.component';
import { SwiperProgramasComponent } from './home/swiper-programas/swiper-programas.component';
import { SkeletonListComponent } from './skeleton-list/skeleton-list.component';

register();

@NgModule({
  declarations: [
    SkeletonListComponent,
    AnimationListComponent,
    SwiperPersonalOnlineComponent,
    SwiperProgramasComponent,
    SwiperConteudosComponent
  ],
  imports: [CommonModule, LazyLoadImageModule],
  exports: [
    SkeletonListComponent,
    AnimationListComponent,
    SwiperPersonalOnlineComponent,
    SwiperProgramasComponent,
    SwiperConteudosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedComponentsModule {}
