import { NgScrollbarModule } from 'ngx-scrollbar';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

const modules = [
  NgScrollbarModule,
  CommonModule,
  HttpClientModule,
  MaterialModule
];

@NgModule({
 imports: modules,
 exports: modules
})
export class SharedModule { }