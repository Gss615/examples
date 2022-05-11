import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


@NgModule({
  imports: [WelcomeRoutingModule,NzDropDownModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
