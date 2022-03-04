import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Tag, Todo } from '../../models';

@Component({
  selector: 'app-todos-list-item',
  templateUrl: './todos-list-item.component.html',
  styleUrls: ['./todos-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListItemComponent implements OnChanges {
  @Input() tags: Tag[] | null = null;
  @Input() todo: Todo | null = null;

  selectedTags: Tag[] | undefined = [];

  ngOnChanges(): void {
    this.updateSelectedTags();
  }

  updateSelectedTags() {
    this.selectedTags = this.tags?.filter(tag => this.todo?.tags?.includes(tag._id));
  }

  getCheckListInformation(): string {
    const information = { checked: 0, total: 0 };

    if (this.todo?.checklists) {
      this.todo.checklists.reduce((acc, checklist) => {
        acc.checked += checklist.items.filter(item => item.checked).length;
        acc.total += checklist.items.length;
        
        return acc;
      }, information);  
    }
    
    return `${information.checked}/${information.total}`;
  }
}
