import { NgScrollbar } from 'ngx-scrollbar';

import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Section, Tag, Todo } from '../../models';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
  @Input() section: Section | null = null;
  @Input() tags: Tag[] | null = null;
  @Input() todos: Todo[] | null = [];
  @ViewChild(NgScrollbar) scrollbar: NgScrollbar | null = null;

  isTodoFormVisible = false;
  isCreatingTodo = false;
  todoForm: FormGroup;
  
  constructor(private router: Router, private todosService: TodosService) {
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
    });
  }

  onTodoClick(todo: Todo) {
    this.router.navigateByUrl(`/todos?id=${todo._id}`);
  }

  showTodoForm(visibility: boolean) {
    this.isTodoFormVisible = visibility;
  
    if (this.isTodoFormVisible) {
      this.scrollbar?.scrollTo({ top: 0 });
    }
  }

  async addTodo() {
    this.isCreatingTodo = true;

    if (this.todoForm.valid && this.section) {
      const index = !this.todos?.length ? 0 : (Math.min(...this.todos.map(todo => todo.index) as number[]) - 1);
      await this.todosService.addTodo({ index, section: this.section.title, ...this.todoForm.value });
    }

    this.isCreatingTodo = false;
  }
}
