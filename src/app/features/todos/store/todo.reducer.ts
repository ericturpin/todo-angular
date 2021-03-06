import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Section, Tag, Todo } from '../models';
import * as SectionEntities from './section.entities';
import * as TagEntities from './tag.entities';
import * as TodoActions from './todo.actions';
import * as TodoEntities from './todo.entities';

export interface State {
  loading: boolean;
  sections: SectionEntities.SectionsState;
  tags: TagEntities.TagsState;
  todos: TodoEntities.TodosState;
  openedTodoId: string | undefined;
}

export const initialState: State = {
  loading: false,
  sections: SectionEntities.sectionsInitialState,
  tags: TagEntities.tagsInitialState,
  todos: TodoEntities.todosInitialState,
  openedTodoId: undefined
};

export const todoFeatureKey = 'todos';
export const todoFeatureSelector = createFeatureSelector<State>(todoFeatureKey);

const todoReducer = createReducer(
  initialState,
  on(TodoActions.loading, (state, { loading }) => ({ ...state, loading })),
  on(TodoActions.sectionsLoaded, (state, { sections }) => ({
    ...state,
    sections: SectionEntities.sectionsAdapter.upsertMany(sections, state.sections),
  })),
  on(TodoActions.addSection, (state, { section }) => ({
    ...state,
    sections: SectionEntities.sectionsAdapter.addOne(section, state.sections)
  })),
  on(TodoActions.updateSections, (state, { updates }) => ({
    ...state,
    sections: SectionEntities.sectionsAdapter.updateMany(updates, state.sections)
  })),
  on(TodoActions.tagsLoaded, (state, { tags }) => ({
    ...state,
    tags: TagEntities.tagsAdapter.upsertMany(tags, state.tags),
  })),
  on(TodoActions.addTag, (state, { tag }) => ({
    ...state,
    tags: TagEntities.tagsAdapter.addOne(tag, state.tags)
  })),
  on(TodoActions.updateTags, (state, { updates }) => ({
    ...state,
    tags: TagEntities.tagsAdapter.updateMany(updates, state.tags)
  })),
  on(TodoActions.deleteTag, (state, { tag }) => ({
    ...state,
    tags: TagEntities.tagsAdapter.removeOne(tag, state.tags)
  })),
  on(TodoActions.todosLoaded, (state, { todos }) => ({
    ...state,
    todos: TodoEntities.todosAdapter.upsertMany(todos, state.todos),
  })),
  on(TodoActions.addTodo, (state, { todo }) => ({
    ...state,
    todos: TodoEntities.todosAdapter.addOne(todo, state.todos)
  })),
  on(TodoActions.updateTodos, (state, { updates }) => ({
    ...state,
    todos: TodoEntities.todosAdapter.updateMany(updates, state.todos)
  })),
  on(TodoActions.openTodo, (state, { openedTodoId }) => ({
    ...state,
    openedTodoId
  }))
);

export function reducer(state: State, action: Action) {
  return todoReducer(state, action);
}

export const selectLoading = createSelector(
  todoFeatureSelector,
  (state) => state.loading
);

export const selectSections = createSelector(
  todoFeatureSelector,
  (state) => {
    const sections = state.sections.ids.map((id) => state.sections.entities[id]) as Section[];    
    return sections.sort((a, b) => a.index < b.index ? -1 : 1);
  }
);

export const selectTags = createSelector(
  todoFeatureSelector,
  (state) => state.tags.ids.map((id) => state.tags.entities[id]) as Tag[]
);

export const selectTodos = createSelector(
  todoFeatureSelector,
  (state) => {
    const todos = state.todos.ids.map((id) => state.todos.entities[id]) as Todo[];

    return todos.sort((a, b) => a.index < b.index ? -1 : 1);
  }
);

export const selectTodosBySection = createSelector(
  selectSections,
  selectTodos,
  (sections, todos) =>
    sections.reduce((acc, section) => ({
      ...acc,
      [section.title]: todos.filter(todo => todo.section === section.title)
    }), {})
);

export const selectOpenedTodo = createSelector(
  todoFeatureSelector,
  (state) => undefined !== state.openedTodoId ? state.todos.entities[state.openedTodoId] : undefined
);
