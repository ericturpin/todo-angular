import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [
  MatIconModule,
  MatToolbarModule
];

@NgModule({
 imports: modules,
 exports: modules
})
export class MaterialModule { }