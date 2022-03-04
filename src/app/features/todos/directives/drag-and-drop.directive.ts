import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { MoveableObject } from '../models';
import { TodosService } from '../services/todos.service';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @Input() data: MoveableObject | undefined;

  constructor(private el: ElementRef, private todosService: TodosService) {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    event.stopPropagation();

    if (event.dataTransfer) {
      this.el.nativeElement.classList.add('dragging');
      event.dataTransfer.setData('dragged', JSON.stringify(this.data));
    }
  }
  
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    this.el.nativeElement.classList.remove('over');
    
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer) {
      const dragged = event.dataTransfer.getData('dragged');

      if (dragged && this.data) {
        this.todosService.moveElement(JSON.parse(dragged), this.data);
      }
    }
  }

  @HostListener('dragend') onDragEnd() {
    this.el.nativeElement.classList.remove('dragging');
  }
}