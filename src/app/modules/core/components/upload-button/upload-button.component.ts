import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {
  @Output() fileChanged = new EventEmitter<FileList>();

  constructor(private host: ElementRef) { }

  @HostListener('click') openBrowserFiles() {
    const inputFiles: HTMLInputElement = this.host.nativeElement.querySelector('input');
    inputFiles.click();
  }

  onFilesChanged(files: FileList | null) {
    if (files) {
      this.fileChanged.emit(files);
    }
  }
}
