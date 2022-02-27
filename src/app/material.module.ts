import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatToolbarModule
];

@NgModule({
 imports: modules,
 exports: modules
})
export class MaterialModule { }