import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinoPageRoutingModule } from './destino-routing.module';

import { DestinoPage } from './destino.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DestinoPage]
})
export class DestinoPageModule {}
