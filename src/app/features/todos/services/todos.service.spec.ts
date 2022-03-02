import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { Section, Todo } from '../models';
import * as fromTodo from '../store';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let sections: Section[];
  let todos: Todo[];
  let service: TodosService;
  let httpController: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        provideMockStore({ initialState: {
          [fromTodo.todoFeatureKey]: fromTodo.initialState
        } }),
      ]
    }).compileComponents();

    sections = [{ _id: 'section-1', index: 0, title: 'to do' }, { _id: 'section-2', index: 1, title: 'done' }];
    todos = [
      { _id: 'todo-0', title: 'todo 0', section: 'to do', description: '', index: 0 },
      { _id: 'todo-1', title: 'todo 1', section: 'to do', description: '', index: 1 }
    ];

    service = TestBed.inject(TodosService);
    service['sections'] = sections;
    service['todos'] = todos;
    
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to load all sections', done => {
    const spy = spyOn(service['store'], 'dispatch');
    
    service.loadSections().then(sections => {
      expect(spy).toHaveBeenCalledWith(fromTodo.sectionsLoaded({ sections }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'GET', url: `/sections` });
    req.event(new HttpResponse({ status: 200, body: sections }));
  });

  it('should be able to add a section', done => {
    const spy = spyOn(service['store'], 'dispatch');

    service.addSection(sections[0]).then(section => {
      expect(spy).toHaveBeenCalledWith(fromTodo.addSection({ section }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'POST', url: `/sections` });
    req.event(new HttpResponse({ status: 200, statusText: 'Created', body: sections[0] }));
  });

  it('should be able to update the section', done => {
    const spy = spyOn(service['store'], 'dispatch');
    
    service.updateSections([sections[0]]).then((updatedSections: Section[]) => {
      const updates = updatedSections.map(section => ({ id: section._id, changes: section }));
      expect(spy).toHaveBeenCalledWith(fromTodo.updateSections({ updates }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'PUT', url: '/sections' });
    req.event(new HttpResponse({ status: 200, statusText: 'Modified', body: [sections[0]] }));
  });

  it('should be able to load all todos', done => {
    const spy = spyOn(service['store'], 'dispatch');
    
    service.loadTodos().then(todos => {
      expect(spy).toHaveBeenCalledWith(fromTodo.todosLoaded({ todos }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'GET', url: `/todos` });
    req.event(new HttpResponse({ status: 200, body: todos }));
  });

  it('should be able to add a todo', done => {
    const spy = spyOn(service['store'], 'dispatch');

    service.addTodo(todos[0]).then(todo => {
      expect(spy).toHaveBeenCalledWith(fromTodo.addTodo({ todo }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'POST', url: `/todos` });
    req.event(new HttpResponse({ status: 200, statusText: 'Created', body: todos[0] }));
  });

  it('should be able to update the todo', done => {
    const spy = spyOn(service['store'], 'dispatch');

    service.updateTodos([todos[0]]).then((updatedTodos: Todo[]) => {
      const updates = updatedTodos.map(todo => ({ id: todo._id, changes: todo }));
      expect(spy).toHaveBeenCalledWith(fromTodo.updateTodos({ updates }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'PUT', url: '/todos' });
    req.event(new HttpResponse({ status: 200, statusText: 'Modified', body: todos[0] }));
  });

  describe('Move sections and todos', () => {
    it('should be able to move a todo to a todo', () => {
      const spyUpdateTodos = spyOn(service, 'updateTodos');

      service.moveElement(todos[1], todos[0]);
      expect(spyUpdateTodos).toHaveBeenCalledWith([{ ...todos[1], index: -1 }]);

      service.moveElement(todos[0], todos[1]);
      expect(spyUpdateTodos).toHaveBeenCalledWith([{ ...todos[1], index: 0 }, { ...todos[0], index: 1 }]);
    });

    it('should be able to move a todo to a section', () => {
      const spyUpdateTodos = spyOn(service, 'updateTodos');

      // move a todo in a empty list => put the todo at the beginning
      service.moveElement(todos[1], sections[1]);
      expect(spyUpdateTodos).toHaveBeenCalledWith([{ ...todos[1], section: 'done', index: 0 }]);

      // move a todo in a not empty list => put the todo at the end
      service['todos'] = [todos[0], todos[1], { ...todos[2], section: 'done', index: 0 }];
      service.moveElement(todos[0], sections[1]);
      expect(spyUpdateTodos).toHaveBeenCalledWith([{ ...todos[0], section: 'done', index: 1 }]);
    });

    it('should be able to move a section to a todo', () => {
      const spyUpdateSections = spyOn(service, 'updateSections');

      service.moveElement(sections[1], todos[0]);
      expect(spyUpdateSections).toHaveBeenCalledWith([{ ...sections[1], index: -1 }]);
    });

    it('should be able to move a section to a section', () => {
      const spyUpdateSections = spyOn(service, 'updateSections');

      service.moveElement(sections[0], sections[1]);
      expect(spyUpdateSections).toHaveBeenCalledWith([{ ...sections[1], index: 0 }, { ...sections[0], index: 1 }]);
    });
  });

  afterEach(() => {
    httpController.verify();
  });
});
