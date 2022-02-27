import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import Todo from './models/todo.model';
import { TodosService } from './services/todos.service';
import * as fromTodo from './store';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
  loading$: Observable<boolean>;
  todos$: Observable<Todo[]>;
  
  constructor(private todosService: TodosService, private store: Store<fromTodo.State>) {
    this.loading$ = this.store.select(fromTodo.selectLoading);  
    this.todos$ = this.store.select(fromTodo.selectTodos);
    this.todosService.loadAll();
  }

  onTodoChange(todo: Todo) {
    this.todosService.updateTodo(todo);
  }
}
