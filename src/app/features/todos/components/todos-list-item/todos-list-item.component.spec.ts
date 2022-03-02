import { TestBed } from '@angular/core/testing';

import { TagsPipe } from '../../pipes/tags.pipe';
import { TodosListItemComponent } from './todos-list-item.component';

describe('TodosListComponent', () => {
  let component: TodosListItemComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodosListItemComponent,
        TagsPipe
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(TodosListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
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
