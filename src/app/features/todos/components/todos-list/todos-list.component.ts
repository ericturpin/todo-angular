import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import Todo from '../../models/todo.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
  @Input() todos: Todo[] | null = [];
  @Output() todoChange = new EventEmitter<Todo>();

  toggleState(todo: Todo) {
    if (this.todos) {
      const state = 'undone' === todo.state ? 'done' : 'undone';
      const index = 'done' === state ? (1 + Math.max(...this.todos.map(todo => todo.index) as number[])) : todo.index;
  
      this.todoChange.emit({ ...todo, state, index });
    }
  }
}
