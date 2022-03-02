import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import Section from '../models/section.model';

export interface SectionsState extends EntityState<Section> {}

export const sectionsAdapter: EntityAdapter<Section> = createEntityAdapter<Section>({
  selectId: (section: Section): string => {
    return section._id;
  },
});

export const sectionsInitialState: SectionsState = sectionsAdapter.getInitialState({});
