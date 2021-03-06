import { NgScrollbarModule } from 'ngx-scrollbar';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

const modules = [
  NgScrollbarModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule, 
  HttpClientModule,
  MaterialModule
];

@NgModule({
 imports: modules,
 exports: modules
})
export class SharedModule { }