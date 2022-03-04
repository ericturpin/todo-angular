import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListItemComponent } from './todos-list-item.component';

describe('TodosListComponent', () => {
  let fixture: ComponentFixture<TodosListItemComponent>;
  let component: TodosListItemComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodosListItemComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodosListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnChanges', () => {
    const spyUpdateSelectedTags = spyOn(component, 'updateSelectedTags');

    component.ngOnChanges();

    expect(spyUpdateSelectedTags).toHaveBeenCalled();
  });

  it('should updateSelectedTags', () => {
    const tags = [{ _id: 'tag-1', title: 'tag 1', color: '#fff' }, { _id: 'tag-2', title: 'tag 2', color: '#fff' }];
    const todo = { _id: 'id1', section: 'done', title: 'todo1', index: 0, description: '', tags: ['tag-2'] };

    component.updateSelectedTags();
    expect(component.selectedTags).toBeFalsy();

    component.tags = tags;
    fixture.detectChanges();
    component.updateSelectedTags();
    expect(component.selectedTags).toEqual([]);
    
    component.todo = todo;
    fixture.detectChanges();
    component.updateSelectedTags();
    expect(component.selectedTags).toEqual([tags[1]]);
  });

  it('should be able to getCheckListInformation', () => {
    expect(component.getCheckListInformation()).toEqual('0/0');

    component.todo = { 
      _id: 'todo-1', 
      section: 'to do', 
      title: 'todo 1', 
      description: '', 
      index: 1, 
      checklists: [{
        title: 'Acceptance criterias',
        items: [
          { checked: true, title: 'Displays a todos list by state' },
          { checked: true, title: 'Add a form to create a new state' },
          { checked: false, title: 'The new state takes place at the right of the existing states' },
          { checked: false, title: 'Change a todo\'s state by drag and drop the todo in the differents lists' },
          { checked: false, title: 'Nice to have: the states could be draggable' },
        ]
      }]
    };
      
    expect(component.getCheckListInformation()).toEqual('2/5');
  });
});
