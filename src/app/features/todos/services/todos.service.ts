import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { isTodo, MoveableObject, Section, Todo } from '../models';
import * as fromTodo from '../store';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private sections: Section[] = [];
  private todos: Todo[] = [];

  constructor(private http: HttpClient, private store: Store<fromTodo.TodosState>) {
    this.store.select(fromTodo.selectSections).subscribe(sections => {
      this.sections = sections;
    });

    this.store.select(fromTodo.selectTodos).subscribe(todos => {
      this.todos = todos;
    });
  }

  loadSections(): Promise<Section[]> {
    return firstValueFrom(this.http.get<Section[]>('/sections')).then(sections => {
      this.store.dispatch(fromTodo.sectionsLoaded({ sections }));
      
      return sections;
    });
  } 

  addSection(section: Partial<Section>): Promise<Section> {
    section._id = uuidv4();

    return firstValueFrom(this.http.post<Section>('/sections', section)).then(() => {
      this.store.dispatch(fromTodo.addSection({ section: section as Section }));
  
      return section as Section;
    });
  }

  updateSections(sections: Section[]): Promise<Section[]> {
    return firstValueFrom(this.http.put<Section[]>('/sections', sections)).then(() => {
      const updates = sections.map(section => ({ id: section._id, changes: section }));
      this.store.dispatch(fromTodo.updateSections({ updates }));
  
      return sections;
    });
  }

  loadTodos(): Promise<Todo[]> {
    this.store.dispatch(fromTodo.loading({ loading: true }));

    return firstValueFrom(this.http.get<Todo[]>('/todos')).then(todos => {
      this.store.dispatch(fromTodo.todosLoaded({ todos }));
      this.store.dispatch(fromTodo.loading({ loading: false }));
      
      return todos;
    });
  }

  addTodo(todo: Partial<Todo>): Promise<Todo> {
    todo._id = uuidv4();

    return firstValueFrom(this.http.post<Todo>(`/todos`, todo)).then(() => {
      this.store.dispatch(fromTodo.addTodo({ todo: todo as Todo }));
  
      return todo as Todo;
    });
  }

  updateTodos(todos: Todo[]): Promise<Todo[]> {
    return firstValueFrom(this.http.put<Todo[]>('/todos', todos)).then(() => {
      this.store.dispatch(fromTodo.updateTodos({ updates: todos.map(todo => ({ id: todo._id, changes: todo })) }));
  
      return todos;
    });
  }

  moveElement(source: MoveableObject, target: MoveableObject) {
    const targetSectionTiltle = isTodo(target) ? target.section : target.title;
    const targetSection = this.sections.find(section => section.title === targetSectionTiltle) as Section;

    if (isTodo(source)) {
      const existingTodosFromTarget = this.todos.filter(todo => todo.section === targetSectionTiltle);

      if (isTodo(target)) {
        const move = 0 < target.index - source.index ? 1 : 0;
        const topTodos = existingTodosFromTarget.filter(todo => todo.index < target.index + move && todo._id != source._id);
        const index = !topTodos.length ? (target.index - 1) : Math.max(...topTodos.map(t => t.index));
        const todosToModify = topTodos.map(todo => ({ ...todo, index: todo.index - 1 })).concat([{ ...source, section: targetSectionTiltle, index }]);

        this.updateTodos(todosToModify);
      } else {
        const existingIndices = existingTodosFromTarget.map(todo => todo.index);
        const index = !existingTodosFromTarget.length ? 0 : Math.max(...existingIndices) + 1;
        const todoToModify = { ...source, section: targetSectionTiltle, index };
    
        this.updateTodos([todoToModify]);
      }
    } else {
      const move = 0 < targetSection.index - source.index ? 1 : 0;
      const topSections = this.sections.filter(section => section.index < targetSection.index + move && section._id != source._id);
      const index = !topSections.length ? (targetSection.index - 1) : Math.max(...topSections.map(t => t.index));
      const sectionsToModify = topSections.map(section => ({ ...section, index: section.index - 1 })).concat([{ ...source, index }]);

      this.updateSections(sectionsToModify);
    }
  }
}
