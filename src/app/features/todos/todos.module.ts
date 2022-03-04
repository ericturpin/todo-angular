import { NgxColorsModule } from 'ngx-colors';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../../modules/core/core.module';
import { SharedModule } from '../../shared.module';
import { TagsFormComponent } from './components/tags-form/tags-form.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodosListItemComponent } from './components/todos-list-item/todos-list-item.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { KeyValuesPipe } from './pipes/key-values.pipe';
import { TagsFilterPipe } from './pipes/tags-filter.pipe';
import { TodosService } from './services/todos.service';
import * as fromTodo from './store';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    DragAndDropDirective,
    KeyValuesPipe,
    TagsFilterPipe,
    TagsFormComponent,
    TodosComponent,
    TodosListComponent,
    TodosListItemComponent,
    TodoDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    NgxColorsModule,
    TodosRoutingModule,
    StoreModule.forFeature(fromTodo.todoFeatureKey, fromTodo.reducer),
  ],
  providers: [
    TodosService
  ]
})
export class TodosModule { }
