import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroExerciciosPageRoutingModule } from './cadastro-exercicios-routing.module';

import { CadastroExerciciosPage } from './cadastro-exercicios.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroExerciciosPageRoutingModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    SharedComponentsModule
  ],
  declarations: [CadastroExerciciosPage]
})
export class CadastroExerciciosPageModule {}
