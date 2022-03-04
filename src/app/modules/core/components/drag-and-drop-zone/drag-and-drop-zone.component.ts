import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop-zone',
  templateUrl: './drag-and-drop-zone.component.html',
  styleUrls: ['./drag-and-drop-zone.component.scss']
})
export class DragAndDropZoneComponent {
  @Output() event = new EventEmitter<DragEvent>();

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.event.emit(event);
  }
}
