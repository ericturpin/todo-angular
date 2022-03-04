import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragAndDropZoneComponent } from './components/drag-and-drop-zone/drag-and-drop-zone.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';

@NgModule({
  declarations: [
    DragAndDropZoneComponent,
    UploadButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragAndDropZoneComponent,
    UploadButtonComponent
  ],
  providers: []
})
export class CoreModule { }
