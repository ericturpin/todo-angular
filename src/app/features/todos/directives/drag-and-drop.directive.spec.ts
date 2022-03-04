import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { DataTransferMock, DragEventMock } from '../../utils/dragevent-mock';
import { TodosService } from '../services/todos.service';
import * as fromTodo from '../store';
import { DragAndDropDirective } from './drag-and-drop.directive';

@Component({
  template: '<li appDragAndDrop>'
})
class DraggingComponent { }



describe('DragAndDropDirective', () => {
  let todosService: TodosService;
  let directive: DragAndDropDirective;
  let fixture: ComponentFixture<DraggingComponent>;
  let component: DraggingComponent;
  let movableElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [DraggingComponent, DragAndDropDirective],
      providers: [
        HttpClient,
        provideMockStore({ initialState: {
          [fromTodo.todoFeatureKey]: fromTodo.initialState
        } }),
      ]
    }).compileComponents();
    
    todosService = TestBed.inject(TodosService);
    
    fixture = TestBed.createComponent(DraggingComponent);
    component = fixture.componentInstance;
    movableElement = fixture.debugElement.query(By.css('li'));

    directive = new DragAndDropDirective(movableElement, todosService);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should be able to dragStart', () => {
    const dragged = { _id: 'todo-1', index: 1, title: 'todo 1' };
    const event = new DragEventMock() as any;
    event.dataTransfer = new DataTransferMock();
    event.target = movableElement.nativeElement;
    
    directive.data = dragged;
    directive.onDragStart(event);

    expect(event.dataTransfer?.getData('dragged')).toEqual(JSON.stringify(dragged));
  });
  
  it('should be able to dragOver', () => {
    const event = new DragEventMock() as any;
    const spyPreventDefault = spyOn(event, 'preventDefault');
    
    directive.onDragOver(event);

    expect(spyPreventDefault).toHaveBeenCalled();
  });
  
  it('should be able to drop', () => {
    const dragged = { _id: 'todo-1', index: 1, title: 'todo 1' };
    const dropped = { _id: 'section-1', index: 1, title: 'section 1' };
    const spyMoveElement = spyOn(todosService, 'moveElement');

    directive.data = dropped;

    const event = new DragEventMock() as any;
    event.dataTransfer = new DataTransferMock();
    event.dataTransfer.setData('dragged', JSON.stringify(dragged));
    event.target = document.createElement('div');

    directive.onDrop(event);
    
    expect(spyMoveElement).toHaveBeenCalledWith(dragged, dropped);
  });

  it('should be able to dragEnd', () => {
    const event = new DragEventMock();
    event.dataTransfer = new DataTransferMock();
    event.target = movableElement.nativeElement as HTMLElement;
    
    const spyRemove = spyOn(event.target.classList, 'remove');

    directive.onDragEnd();

    expect(spyRemove).toHaveBeenCalledWith('dragging');
  });
});

