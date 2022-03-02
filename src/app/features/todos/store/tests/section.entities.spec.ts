import { sectionsAdapter } from '../section.entities';

describe('Section entities', () => {
  it('should be able to do a selectId', () => {
    expect(sectionsAdapter.selectId({ _id: 'section-a', title: 'section A', index: 0 })).toBe('section-a');
  });
});
