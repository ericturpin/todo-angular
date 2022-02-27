import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared.module';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosService } from './services/todos.service';
import * as fromTodo from './store';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent,
    TodosListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodosRoutingModule,
    StoreModule.forFeature(fromTodo.todoFeatureKey, fromTodo.reducer),
  ],
  providers: [
    TodosService
  ]
})
export class TodosModule { }
