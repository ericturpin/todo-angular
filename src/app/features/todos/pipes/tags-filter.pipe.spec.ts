import { TagsFilterPipe } from './tags-filter.pipe';

describe('TagsFilterPipe', () => {
  const tags = [
    { _id: 'i1', title: 'feature', color: '#fff'}, 
    { _id: 'i2', title: 'bug', color: '#fee'},
    { _id: 'i3', title: 'style', color: '#aaa'}
  ];

  it('should be able to transform', () => {
    const pipe = new TagsFilterPipe();

    expect(pipe.transform(tags, 't')).toEqual([tags[0], tags[2]]);
    expect(pipe.transform(null, 't')).toEqual([]);
  });
});