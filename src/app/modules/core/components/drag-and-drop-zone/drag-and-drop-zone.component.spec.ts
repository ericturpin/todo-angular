import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataTransferMock, DragEventMock } from '../../../../features/utils/dragevent-mock';
import { DragAndDropZoneComponent } from './drag-and-drop-zone.component';

describe('DragAndDropZoneComponent', () => {
  let component: DragAndDropZoneComponent;
  let fixture: ComponentFixture<DragAndDropZoneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAndDropZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to drop', () => {
    const spyEmit = spyOn(component.event, 'emit');
    const event = new DragEventMock() as any;
    event.dataTransfer = new DataTransferMock();
  
    component.onDrop(event);
      
    expect(spyEmit).toHaveBeenCalledWith(event);
  });
});
