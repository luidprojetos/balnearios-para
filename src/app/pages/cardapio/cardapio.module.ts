import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardapioPageRoutingModule } from './cardapio-routing.module';

import { CardapioPage } from './cardapio.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardapioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CardapioPage]
})
export class CardapioPageModule {}
