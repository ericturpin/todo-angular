import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Todo } from '../../models';

@Component({
  selector: 'app-todos-list-item',
  templateUrl: './todos-list-item.component.html',
  styleUrls: ['./todos-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListItemComponent {
  @Input() todo: Todo | null = null;

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
