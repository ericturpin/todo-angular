import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from '../../../../material.module';
import { DataTransferMock, DragEventMock } from '../../../utils/dragevent-mock';
import { Todo } from '../../models';
import { TagsFilterPipe } from '../../pipes/tags-filter.pipe';
import * as fromTodo from '../../store';
import { TodoDetailsComponent } from './todo-details.component';

describe('TodoDetailsComponent', () => {
  const todo: Todo = { _id: 'todo-1', section: 'done', title: 'todo 1', tags: ['tag-1'], index: 0, description: '' };
  const cover = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5gMFEhEDqcXdaQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAVSURBVAjXBcEBAQAAAIAQ/08XUKkwKeQF+2OdNgAAAAAASUVORK5CYII=';
  let component: TodoDetailsComponent;

  async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  }

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        TodoDetailsComponent,
        TagsFilterPipe
      ],
      providers: [
        HttpClient,
        provideMockStore({ initialState: {
          [fromTodo.todoFeatureKey]: fromTodo.initialState
        } }),
      ]
    }).compileComponents().then(() => {
      todo.cover = cover;

      const fixture = TestBed.createComponent(TodoDetailsComponent);
      
      component = fixture.componentInstance;
      component.todo = todo;
      fixture.detectChanges();

      done();
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should ngAfterViewInit', () => {
    component.ngAfterViewInit();

    expect(component.quill).toBeTruthy();
  });

  it('should be able to add a tag', () => {
    const spyEmit = spyOn(component['todosService'], 'addTag');
    const tag = { title: 'tag 1', color: '#eee' };

    component.onAddTag(tag);
  
    expect(spyEmit).toHaveBeenCalledWith(tag);
  });

  it('should be able to update a tag', () => {
    const spyEmit = spyOn(component['todosService'], 'updateTags');
    const tag = { _id: 'tag-1', title: 'tag 1', color: '#eee' };

    component.onUpdateTag(tag);
  
    expect(spyEmit).toHaveBeenCalledWith([tag]);
  });

  it('should be able to update the selected tags', () => {
    const spyEmit = spyOn(component['todosService'], 'updateTodos');
    const todo = { _id: 'todo-1', section: 'done', title: 'todo 1', tags: ['tag-1'], index: 0, description: '' };
   
    component['todo'] = todo;
    component.onSelectedTagsChange(['tag-2', 'tag-3']);
  
    expect(spyEmit).toHaveBeenCalledWith([{...todo, tags: ['tag-2', 'tag-3'] }]);
  });

  it('should be able to delete a tag', () => {
    const spyEmit = spyOn(component['todosService'], 'deleteTag');
    const tag = { _id: 'tag-1', title: 'tag 1', color: '#eee' };

    component.onDeleteTag(tag);
  
    expect(spyEmit).toHaveBeenCalledWith(tag);
  });

  it('should be able to close', () => {
    const spyEmit = spyOn(component.destroy, 'emit');

    component.close();
  
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should be able to remove the cover', () => {
    const spyEmit = spyOn(component['todosService'], 'updateTodos');

    expect(component.todo?.cover).toBeTruthy();

    component.removeCover();
  
    expect(spyEmit).toHaveBeenCalledWith([{...todo, cover: undefined }]);
  });

  it('should be able to drop from a DragEvent', done => {
    const spyEmit = spyOn(component['todosService'], 'updateTodos');
    
    dataUrlToFile(cover, 'cover.png').then(file => {
      const event = new DragEventMock() as any;
      event.dataTransfer = new DataTransferMock();
      event.dataTransfer.files = {
        length: 1,
        item() { return file; },
        0: file
      };
  
      component.onDropEvent(event);
  
      setTimeout(() => {
        expect(spyEmit).toHaveBeenCalledWith([{...todo, cover }]);
        done();
      }, 100);
    });
  });

  it('should not updateTodos if no file', done => {
    const spyEmit = spyOn(component['todosService'], 'updateTodos');
    
    const event = new DragEventMock() as any;
    event.dataTransfer = new DataTransferMock();

    component.onDropEvent(event);

    setTimeout(() => {
      expect(spyEmit).not.toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should be able to drop from a FileList', done => {
    const spyEmit = spyOn(component['todosService'], 'updateTodos');
    
    dataUrlToFile(cover, 'cover.png').then(file => {
      const fileList = {
        length: 1,
        item() { return file; },
        0: file
      };
  
      component.onDropEvent(fileList);
  
      setTimeout(() => {
        expect(spyEmit).toHaveBeenCalledWith([{...todo, cover }]);
        done();
      }, 100);
    });
  });
});
