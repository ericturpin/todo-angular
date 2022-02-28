import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import * as fromTodo from './store';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let httpController: HttpTestingController;
  let component: TodosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        TodosComponent
      ],
      providers: [
        HttpClient,
        provideMockStore({ initialState: {} }),
      ]
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    
    const fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to init the component', (done) => {
    const spy = spyOn(component['store'], 'dispatch');

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(fromTodo.todosLoaded({ todos: [] }));
      done();
    });

    const req = httpController.expectOne({ method: 'GET', url: '/todos' });
    req.flush([]);
  });

  it('should be able to close the todo details', () => {
    const spyNavigateByUrl = spyOn(component['router'], 'navigateByUrl');
    const spyDispatch = spyOn(component['store'], 'dispatch');

    component.onCloseTodoDetails();
  
    expect(spyDispatch).toHaveBeenCalledWith(fromTodo.openTodo({ openedTodoId: undefined }));
    expect(spyNavigateByUrl).toHaveBeenCalledWith('/todos');
  });
});

