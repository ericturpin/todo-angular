import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadButtonComponent } from './upload-button.component';

describe('UploadButtonComponent', () => {
  let component: UploadButtonComponent;
  let fixture: ComponentFixture<UploadButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able browse files', () => {
    const input = component['host'].nativeElement.querySelector('input');
    const spyClick = spyOn(input, 'click');
    
    component.openBrowserFiles();

    expect(spyClick).toHaveBeenCalled();
  });

  it('should onFilesChanged', () => {
    const fileList = {
      length: 0,
      item() { return null; },
    };

    const spyEmit = spyOn(component.fileChanged, 'emit');

    component.onFilesChanged(fileList);

    expect(spyEmit).toHaveBeenCalledWith(fileList);
  });
});
