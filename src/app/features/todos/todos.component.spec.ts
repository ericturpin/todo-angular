import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import * as fromTodo from './store';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  const sections = [{ _id: 'section-1', index: 0, title: 'to do' }, { _id: 'section-2', index: 1, title: 'done' }];
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
        provideMockStore({ initialState: {
          [fromTodo.todoFeatureKey]: fromTodo.initialState
        } }),
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
      expect(spy).toHaveBeenCalledWith(fromTodo.sectionsLoaded({ sections }));
      expect(spy).toHaveBeenCalledWith(fromTodo.todosLoaded({ todos: [] }));
      done();
    });

    let req = httpController.expectOne({ method: 'GET', url: '/sections' });
    req.flush(sections);

    req = httpController.expectOne({ method: 'GET', url: '/todos' });
    req.flush([]);
  });

  it('should be able to add a section into a empty list', () => {
    const spyAddSection = spyOn(component['todosService'], 'addSection');

    component.sectionNameControl.setValue('section A');
    component.onSectionNameKeyUp({ key: 'Enter' } as KeyboardEvent);
  
    expect(spyAddSection).toHaveBeenCalledWith({ title: 'section A', index: 0 });
  });

  it('should be able to add a section into a not empty list', () => {
    const spyAddSection = spyOn(component['todosService'], 'addSection');

    component.sections = sections;
    component.sectionNameControl.setValue('section A');
    component.onSectionNameKeyUp({ key: 'Enter' } as KeyboardEvent);
  
    expect(spyAddSection).toHaveBeenCalledWith({ title: 'section A', index: 2 });
  });

  it('should be able to close the todo details', () => {
    const spyNavigateByUrl = spyOn(component['router'], 'navigateByUrl');
    const spyDispatch = spyOn(component['store'], 'dispatch');

    component.onCloseTodoDetails();
  
    expect(spyDispatch).toHaveBeenCalledWith(fromTodo.openTodo({ openedTodoId: undefined }));
    expect(spyNavigateByUrl).toHaveBeenCalledWith('/todos');
  });
});

