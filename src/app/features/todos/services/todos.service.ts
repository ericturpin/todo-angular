import { firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import Todo from '../models/todo.model';
import * as fromTodo from '../store';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private http: HttpClient, private store: Store<fromTodo.State>) { }

  loadAll(): Promise<Todo[]> {
    this.store.dispatch(fromTodo.loading({ loading: true }));

    return firstValueFrom(this.http.get<Todo[]>('/todos')).then(todos => {
      this.store.dispatch(fromTodo.todosLoaded({ todos }));
      this.store.dispatch(fromTodo.loading({ loading: false }));
      
      return todos;
    });
  }

  updateTodo(todo: Todo): Promise<Todo> {
    return firstValueFrom(this.http.put<Todo>(`/todos/${todo._id}`, todo)).then(() => {
      this.store.dispatch(fromTodo.updateTodo({ update: { id: todo._id, changes: todo } }));
  
      return todo;
    });
  }
}
