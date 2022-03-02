import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keyValues'})
export class KeyValuesPipe<T> implements PipeTransform {
  transform(value: {[key: string]: T[]} | null, key: string): T[] | null {
    return value && value[key];
  }
}