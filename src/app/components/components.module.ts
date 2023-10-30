import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackbuttonComponent } from './backbutton/backbutton.component';
import { MaskitoModule } from '@maskito/angular';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, MaskitoModule],
  declarations: [BackbuttonComponent, NavbarComponent],
  exports: [BackbuttonComponent, NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
