import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import Todo from '../../models/todo.model';
import { TodosListComponent } from './todos-list.component';

describe('TodosListComponent', () => {
  const todos: Todo[] = [0, 1, 2].map(i => ({ _id: `todo-${i}`, title: `todo ${i}`, section: 'to do', description: '', index: i }));
  let component: TodosListComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        TodosListComponent
      ],
      providers: [
        HttpClient,
        provideMockStore({ initialState: {} }),
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    component.section = { _id: 'section-0', title: 'to do', index: 0 };
    component.todos = todos;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to click on a todo', () => {
    const spy = spyOn(component['router'], 'navigateByUrl');
    
    component.onTodoClick(todos[0]);

    expect(spy).toHaveBeenCalledWith(`/todos?id=${todos[0]._id}`);
  });

  it('should be able to create the first todo', () => {
    const spy = spyOn(component['todosService'], 'addTodo');
    const todoToCreate = { title: 'todo', description: 'descr'  };

    // test with a todos is null
    component.todos = null;
    component.todoForm.patchValue(todoToCreate);
    component.addTodo();

    expect(spy).toHaveBeenCalledWith({ index: 0, section: 'to do', ...todoToCreate });

    // test with a todos is not null
    component.todos = [];
    component.addTodo();

    expect(spy).toHaveBeenCalledWith({ index: 0, section: 'to do', ...todoToCreate });
  });
  it('should be able to add a todo at the top of a existing todos list', () => {
    const spy = spyOn(component['todosService'], 'addTodo');
    const todoToCreate = { title: 'todo 7', description: 'descr 7'  };

    component.todoForm.patchValue(todoToCreate);
    component.addTodo();

    expect(spy).toHaveBeenCalledWith({ index: -1, section: 'to do', ...todoToCreate });
  });

  it('should be able to show the todo form and scroll at the top of the list', () => {
    component.showTodoForm(true);

    expect(component.isTodoFormVisible).toBe(true);

    // eslint-disable-next-line
    // @ts-ignore
    component.scrollbar = {
      scrollTo: (): Promise<void> => Promise.resolve()
    };

    component.showTodoForm(true);

    expect(component.isTodoFormVisible).toBe(true);
  });
});
