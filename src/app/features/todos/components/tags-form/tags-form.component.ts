import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Tag } from '../../models';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsFormComponent implements OnChanges {
  @Input() template: 'list'|'form' = 'list';
  @Input() tags: Tag[] | null | undefined;
  @Input() selected: string[] | null | undefined;
  
  editingTag: Partial<Tag> | null = { title: '', color: '#fff' };
  searchFormControl = new FormControl('');
  tagNameFormControl = new FormControl('', Validators.required);

  @Output() styleChange = new EventEmitter<string>();
  @Output() add = new EventEmitter<Partial<Tag>>();
  @Output() update = new EventEmitter<Tag>();
  @Output() delete = new EventEmitter<Tag>();
  @Output() selectedChange = new EventEmitter<string[]>();
  @Output() destroy = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (undefined != changes['template']) {
      this.editingTag = null;
    }
  }

  isSelected(tagId: string | undefined): boolean {
    return undefined != this.selected?.find(tag => tag === tagId);
  }

  toggleTagChecked(tag: Tag) {
    let newSelected;

    if (!this.selected) {
      newSelected = [ tag._id ];
    } else {
      const tagIndex = this.selected.findIndex(t => t === tag._id);
      newSelected = tagIndex != -1 ? this.selected.filter(t => t !== tag._id) : [...this.selected, tag._id];   
    }

    this.selectedChange.emit(newSelected);
  }

  openColorsPanel(tag?: Tag) {
    this.editingTag = tag ? { ...tag } : { title: this.searchFormControl.value, color: '#90A4AE' };
    this.tagNameFormControl.setValue(this.editingTag.title);
    this.searchFormControl.setValue('');
  }

  onColorChange(color: string) {
    if (this.editingTag) {
      this.editingTag.color = color;
    }
  }

  saveTag() {
    const tag = { ...this.editingTag, title: this.tagNameFormControl.value };
    
    if (undefined == tag._id) {
      this.add.emit(tag);
    } else {
      this.update.emit(tag as Tag);
    }

    this.editingTag = null;
  }

  deleteTag() {
    this.delete.emit(this.editingTag as Tag);
    this.editingTag = null;
  }
}
