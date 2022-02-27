import { adapter } from '../todo.entities';

describe('Todo entities', () => {
  it('should be able to do a selectId', () => {
    expect(adapter.selectId({ _id: 'eric', title: 'title A', state: 'done', description: '' })).toBe('eric');
  });
});
