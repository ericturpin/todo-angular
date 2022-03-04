import Quill from 'quill';

import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Tag, Todo } from '../../models';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailsComponent implements AfterViewInit {
  @Input() todo: Todo | null | undefined = null;
  @Input() tags: Tag[] | null | undefined = null;
  @Output() destroy = new EventEmitter<void>();

  isTagsListOpened = false;
  quill: Quill | undefined;

  constructor(private todosService: TodosService) { }

  ngAfterViewInit(): void {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [ 'link', 'image', 'video', 'formula' ],          // add's image support
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    this.quill = new Quill('.editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });
  }

  onAddTag(tag: Partial<Tag>) {
    this.todosService.addTag(tag);
  }
   
  onUpdateTag(tag: Tag) {
    this.todosService.updateTags([tag]);
  }

  onSelectedTagsChange(selected: string[]) {
    if (this.todo) {
      this.todosService.updateTodos([{ ...this.todo, tags: selected }]);
    }
  }

  onDeleteTag(tag: Tag) {
    this.todosService.deleteTag(tag);
  }

  close() {
    this.destroy.emit();
  }

  removeCover() {
    const todoWithoutCover = { ...this.todo, cover: undefined } as Todo;
    this.todosService.updateTodos([todoWithoutCover]);
  }

  onDropEvent(event: DragEvent | FileList): void {
    let files;

    if ((event as FileList).length) {
      files = event;
    } else {
      const dataTransfer = (event as DragEvent).dataTransfer;

      if (dataTransfer) {
        files = dataTransfer.files;
      }
    }
    
    if (files) {
      const file = (files as FileList).item(0);  
      const reader = new FileReader();

      reader.onload = () => {
        const todoWithCover = { ...this.todo, cover: reader.result } as Todo;
        this.todosService.updateTodos([todoWithCover]);
      };

      reader.readAsDataURL(file as File);
    }
  }
}
