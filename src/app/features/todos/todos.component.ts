import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  openedTodo$: Observable<Todo | undefined>;

  constructor(private todosService: TodosService, private store: Store<fromTodo.State>, private route: ActivatedRoute, private router: Router) {
    this.loading$ = this.store.select(fromTodo.selectLoading);  
    this.todos$ = this.store.select(fromTodo.selectTodos);
    this.openedTodo$ = this.store.select(fromTodo.selectOpenedTodo);
    this.todosService.loadAll();

    this.route.queryParams.subscribe(params => {
      this.store.dispatch(fromTodo.openTodo({ openedTodoId: params['id'] }));
    });
  }

  onTodoChange(todo: Todo) {
    this.todosService.updateTodo(todo);
  }

  onCloseTodoDetails() {
    this.store.dispatch(fromTodo.openTodo({ openedTodoId: undefined }));
    this.router.navigateByUrl(`/todos`);
  }
}
