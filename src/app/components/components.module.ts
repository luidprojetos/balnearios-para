import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackbuttonComponent } from './backbutton/backbutton.component';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, MaskitoModule],
  declarations: [BackbuttonComponent],
  exports: [BackbuttonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
