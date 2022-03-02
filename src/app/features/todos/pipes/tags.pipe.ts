import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tags'})
export class TagsPipe implements PipeTransform {
  transform(value: undefined | string[]): string {
    return value ? value.join(', ') : '';
  }
}