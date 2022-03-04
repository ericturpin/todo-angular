import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import Tag from '../models/tag.model';

export interface TagsState extends EntityState<Tag> {}

export const tagsAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({
  selectId: (tag: Tag): string => {
    return tag._id;
  },
});

export const tagsInitialState: TagsState = tagsAdapter.getInitialState({});
