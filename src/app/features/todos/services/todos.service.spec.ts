import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromTodo from '../store';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let store: MockStore;
  let service: TodosService;
  let httpController: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        provideMockStore({ initialState: {} }),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    service = TestBed.inject(TodosService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to add a todo', done => {
    const spy = spyOn(service['store'], 'dispatch');
    const todo = { title: 'todo 1', state: 'undone', description: '', index: 1 };

    service.addTodo(todo).then(todo => {
      expect(spy).toHaveBeenCalledWith(fromTodo.addTodo({ todo }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'POST', url: `/todos` });
    req.event(new HttpResponse({ status: 200, statusText: 'Created', body: todo }));
  });

  it('should be able to update the todo', done => {
    const spy = spyOn(service['store'], 'dispatch');
    const todo = { _id: 'todo-1', title: 'todo 1', state: 'done', description: '', index: 1 };

    service.updateTodo(todo).then(() => {
      expect(spy).toHaveBeenCalledWith(fromTodo.updateTodo({ update: { id: todo._id, changes: todo } }));
      done();
    });  
  
    const req = httpController.expectOne({ method: 'PUT', url: `/todos/${todo._id}` });
    req.event(new HttpResponse({ status: 200, statusText: 'Modified', body: todo }));
  });

  afterEach(() => {
    httpController.verify();
  });
});
