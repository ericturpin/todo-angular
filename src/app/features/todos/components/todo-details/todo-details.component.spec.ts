import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TodoDetailsComponent } from './todo-details.component';

describe('TodosListComponent', () => {
  let component: TodoDetailsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TodoDetailsComponent
      ],
    }).compileComponents();
  
    const fixture = TestBed.createComponent(TodoDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to close', () => {
    const spyEmit = spyOn(component.destroy, 'emit');

    component.close();
  
    expect(spyEmit).toHaveBeenCalled();
  });
});
