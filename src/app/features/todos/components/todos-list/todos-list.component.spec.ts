import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import Todo from '../../models/todo.model';
import { TodosListComponent } from './todos-list.component';

describe('TodosListComponent', () => {
  const todos: Todo[] = [1, 2, 3].map(i => ({ _id: `todo-${i}`, title: `todo ${i}`, state: 'undone', description: '', index: i }));
  let component: TodosListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TodosListComponent
      ],
    }).compileComponents();
  
    const fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    component.todos = todos;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to move state from undone to done and change the index', () => {
    const spy = spyOn(component.todoChange, 'emit');
    
    component.toggleState(todos[0]);

    expect(spy).toHaveBeenCalledWith({ ...todos[0], state: 'done', index: 4 });
  });

  it('should be able to move state from done to undone and not change the index', () => {
    const spy = spyOn(component.todoChange, 'emit');
    
    component.toggleState({ ...todos[0], state: 'done' });

    expect(spy).toHaveBeenCalledWith({ ...todos[0], state: 'undone', index: todos[0].index });
  });
});
