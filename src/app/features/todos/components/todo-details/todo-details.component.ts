import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import Todo from '../../models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailsComponent {
  @Input() todo: Todo | null | undefined = null;
  @Output() destroy = new EventEmitter<void>();

  close() {
    this.destroy.emit();
  }
}
