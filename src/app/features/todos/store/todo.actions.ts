import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Section, Tag, Todo } from '../models';

export const loading = createAction('[Todo] Loading', props<{ loading: boolean }>());

export const sectionsLoaded = createAction('[Todo] Sections loaded', props<{ sections: Section[] }>());
export const addSection = createAction('[Todo] Add section', props<{ section: Section }>());
export const updateSections = createAction('[Todo] Update sections', props<{ updates: Update<Section>[] }>());

export const tagsLoaded = createAction('[Todo] Tags loaded', props<{ tags: Tag[] }>());
export const addTag = createAction('[Todo] Add tag', props<{ tag: Tag }>());
export const updateTags = createAction('[Todo] Update tags', props<{ updates: Update<Tag>[] }>());
export const deleteTag = createAction('[Todo] Delete tag', props<{ tag: string }>());

export const todosLoaded = createAction('[Todo] Todos loaded', props<{ todos: Todo[] }>());
export const addTodo = createAction('[Todo] Add todo', props<{ todo: Todo }>());
export const updateTodos = createAction('[Todo] Update todos', props<{ updates: Update<Todo>[] }>());
export const openTodo = createAction('[Todo] Open todo', props<{ openedTodoId: string | undefined }>());
