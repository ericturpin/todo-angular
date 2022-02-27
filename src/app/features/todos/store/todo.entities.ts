import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import Todo from '../models/todo.model';

export interface TodosState extends EntityState<Todo> {}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo): string => {
    return todo._id;
  },
});

export const todosInitialState: TodosState = adapter.getInitialState({});