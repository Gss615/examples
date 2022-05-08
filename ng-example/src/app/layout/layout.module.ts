import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { BaseLayoutComponent } from './base-layout/base-layout.component';

const LAYOUT = [
  BaseLayoutComponent
]

@NgModule({
  declarations: [
    ...LAYOUT
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ],
  exports:[
    ...LAYOUT
  ]
})
export class LayoutModule { }
