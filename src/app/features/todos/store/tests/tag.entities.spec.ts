import { tagsAdapter } from '../tag.entities';

describe('Tag entities', () => {
  it('should be able to do a selectId', () => {
    expect(tagsAdapter.selectId({ _id: 'tag-1', title: 'bug', color: '#faa' })).toBe('tag-1');
  });
});
