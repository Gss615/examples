import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
