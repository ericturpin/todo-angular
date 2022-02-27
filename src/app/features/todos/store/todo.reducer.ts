import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import Todo from '../models/todo.model';
import * as TodoActions from './todo.actions';
import * as TodoEntities from './todo.entities';

export interface State {
  loading: boolean;
  todos: TodoEntities.TodosState;
}

export const initialState: State = {
  loading: false,
  todos: TodoEntities.todosInitialState,
};

export const todoFeatureKey = 'todos';
export const todoFeatureSelector = createFeatureSelector<State>(todoFeatureKey);

const todoReducer = createReducer(
  initialState,
  on(TodoActions.loading, (state, { loading }) => ({ ...state, loading })),
  on(TodoActions.todosLoaded, (state, { todos }) => ({
    ...state,
    todos: TodoEntities.adapter.upsertMany(todos, state.todos),
  }))
);

export function reducer(state: State, action: Action) {
  return todoReducer(state, action);
}

export const selectLoading = createSelector(
  todoFeatureSelector,
  (state) => state.loading
);

export const selectTodos = createSelector(
  todoFeatureSelector,
  (state) => state.todos.ids.map((id) => state.todos.entities[id]) as Todo[]
);
