import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Section, Tag, Todo } from './models';
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

  // sections information
  sections: Section[] = [];
  sectionNameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  // tags information
  tags$: Observable<Tag[]>;
    
  // todos information
  todosBySection$: Observable<{ [section: string]: Todo[] }>;
  openedTodo$: Observable<Todo | undefined>;

  constructor(private todosService: TodosService, private store: Store<fromTodo.TodosState>, private route: ActivatedRoute, private router: Router) {
    this.loading$ = this.store.select(fromTodo.selectLoading);  

    this.store.select(fromTodo.selectSections).subscribe(sections => {
      this.sections = sections;
    });
    
    this.tags$ = this.store.select(fromTodo.selectTags);

    this.todosBySection$ = this.store.select(fromTodo.selectTodosBySection);
    this.openedTodo$ = this.store.select(fromTodo.selectOpenedTodo);
    
    this.todosService.loadSections();
    this.todosService.loadTags();
    this.todosService.loadTodos();

    this.route.queryParams.subscribe(params => {
      this.store.dispatch(fromTodo.openTodo({ openedTodoId: params['id'] }));
    });
  }

  onSectionNameKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.sectionNameControl.valid) {
      const index = !this.sections.length ? 0 : (Math.max(...this.sections.map(todo => todo.index) as number[]) + 1);
      this.todosService.addSection({ title: this.sectionNameControl.value, index });
    }
  }

  onCloseTodoDetails() {
    this.store.dispatch(fromTodo.openTodo({ openedTodoId: undefined }));
    this.router.navigateByUrl(`/todos`);
  }
}
