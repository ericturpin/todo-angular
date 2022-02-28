import { NgScrollbar } from 'ngx-scrollbar';

import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Todo from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
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

  toggleState(todo: Todo) {
    if (this.todos) {
      const state = 'undone' === todo.state ? 'done' : 'undone';
      const index = 'done' === state ? (1 + Math.max(...this.todos.map(todo => todo.index) as number[])) : todo.index;
  
      this.todosService.updateTodo({ ...todo, state, index });
    }
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

    if (this.todoForm.valid) {
      const index = !this.todos?.length ? 0 : (Math.min(...this.todos.map(todo => todo.index) as number[]) - 1);
      await this.todosService.addTodo({ index, state: 'undone', ...this.todoForm.value });
    }

    this.isCreatingTodo = false;
  }
}
