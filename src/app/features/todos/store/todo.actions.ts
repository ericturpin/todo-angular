import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import Todo from '../models/todo.model';

export const loading = createAction('[Todo] Loading', props<{ loading: boolean }>());
export const todosLoaded = createAction('[Todo] Todos loaded', props<{ todos: Todo[] }>());
export const updateTodo = createAction('[Todo] Update todo', props<{ update: Update<Todo> }>());