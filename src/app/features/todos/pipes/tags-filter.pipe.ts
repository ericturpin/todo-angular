import { Pipe, PipeTransform } from '@angular/core';

import { Tag } from '../models';

@Pipe({name: 'tagsFilter'})
export class TagsFilterPipe implements PipeTransform {
  transform(tags: Tag[] | null | undefined, title: string): Tag[] {
    return tags ? tags.filter(tag => tag.title.includes(title)) : [];
  }
}