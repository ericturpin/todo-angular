import { todosAdapter } from '../todo.entities';

describe('Todo entities', () => {
  it('should be able to do a selectId', () => {
    expect(todosAdapter.selectId({ _id: 'eric', title: 'title A', section: 'done', description: '', index: 0 })).toBe('eric');
  });
});
