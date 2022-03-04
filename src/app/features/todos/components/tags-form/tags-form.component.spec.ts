import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tag } from '../../models';
import { TagsFormComponent } from './tags-form.component';

describe('TagsFormComponent', () => {
  const tags = [{ _id: 'tag-1', title: 'feature', color: '#aaa' }, { _id: 'tag-2', title: 'style', color: '#aaf' }];
  let fixture: ComponentFixture<TagsFormComponent>;
  let component: TagsFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TagsFormComponent,
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(TagsFormComponent);
    component = fixture.componentInstance;
    component.tags = tags;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to detect changes', () => {
    component.editingTag = tags[0];
    fixture.detectChanges();

    expect(component.editingTag).toBeTruthy();

    const changes: SimpleChanges = { template: new SimpleChange('list', 'form', false) };
    component.ngOnChanges(changes);
    fixture.detectChanges();

    expect(component.editingTag).toBeFalsy();
  });

  it('should isSelected', () => {
    component.selected = undefined;
    fixture.detectChanges();

    expect(component.isSelected('tag-1')).toBeFalse();

    component.selected = ['tag-2'];
    fixture.detectChanges();

    expect(component.isSelected('tag-2')).toBeTrue();
  });

  describe('toggleTagChecked', () => {
    it('should be able to toggle when no tags selected', () => {
      const spy = spyOn(component.selectedChange, 'emit');
  
      component.toggleTagChecked(tags[0]);
      expect(spy).toHaveBeenCalledWith(['tag-1']);
    });

    it('should be able to toggle a selected tag', () => {
      const spy = spyOn(component.selectedChange, 'emit');
  
      component.selected = [tags[0]._id, tags[1]._id];
      component.toggleTagChecked(tags[0]);

      expect(spy).toHaveBeenCalledWith([tags[1]._id]);
    });

    it('should be able to toggle a unselected tag', () => {
      const spy = spyOn(component.selectedChange, 'emit');
      
      component.selected = ['tag-3', 'tag-4'];
      component.toggleTagChecked(tags[0]);

      expect(spy).toHaveBeenCalledWith(['tag-3', 'tag-4', tags[0]._id]);
    });
  });

  it('should be able to open the colors panel to create a new tag', () => {
    component.openColorsPanel();

    expect(component.editingTag).toEqual({ title: '', color: '#90A4AE' });
    expect(component.tagNameFormControl.value).toEqual('');
    expect(component.searchFormControl.value).toEqual('');
  });

  it('should be able to open the colors panel to update a existing tag', () => {
    component.openColorsPanel(tags[0]);

    expect(component.editingTag).toEqual(tags[0]);
    expect(component.tagNameFormControl.value).toEqual(tags[0].title);
    expect(component.searchFormControl.value).toEqual('');
  });

  it('should be able to change the color from the editing tag', () => {
    component.openColorsPanel(tags[0]);
    component.onColorChange('#123');

    const editingTag = component.editingTag as Tag;

    expect(editingTag.color).toEqual('#123');
  });

  it('should be able to save a tag without ID', () => {
    const spyAdd = spyOn(component.add, 'emit');

    component.openColorsPanel();
    component.tagNameFormControl.setValue('style');
    component.saveTag();
    
    expect(spyAdd).toHaveBeenCalledWith({ title: 'style', color: '#90A4AE' });
    expect(component.editingTag).toBeFalsy();
  });

  it('should be able to save a tag having a ID', () => {
    const spyUpdate = spyOn(component.update, 'emit');

    component.openColorsPanel(tags[0]);
    component.tagNameFormControl.setValue('style');
    component.saveTag();
    
    expect(spyUpdate).toHaveBeenCalledWith({ ...tags[0], title: 'style' });
    expect(component.editingTag).toBeFalsy();
  });

  it('should be able to delete the editing tag', () => {
    const spyDelete = spyOn(component.delete, 'emit');

    component.openColorsPanel(tags[0]);
    component.deleteTag();
    
    expect(spyDelete).toHaveBeenCalledWith(tags[0]);
    expect(component.editingTag).toBeFalsy();
  });
});
