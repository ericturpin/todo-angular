import { KeyValuesPipe } from './key-values.pipe';

describe('KeyValuesPipe', () => {
  it('should be able to transform', () => {
    const pipe = new KeyValuesPipe();

    expect(pipe.transform({ key1: [{ test: 4 }], key2: [1, 2, 3] }, 'key1')).toEqual([{ test: 4 }]);
  });
});