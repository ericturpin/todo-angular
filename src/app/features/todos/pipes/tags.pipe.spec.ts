import { TagsPipe } from './tags.pipe';

describe('TagsPipe', () => {
  it('should be able to transform', () => {
    const pipe = new TagsPipe();

    expect(pipe.transform(['tag1', 'tag2', 'tag3'])).toEqual('tag1, tag2, tag3');
    expect(pipe.transform(undefined)).toEqual('');
  });
});