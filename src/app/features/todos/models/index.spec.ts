import { isSection, isTodo } from './';

describe('Models', () => {
  it('should be able to detect a section', () => {
    expect(isSection({ _id: 'section-1', index: 1, title: 'section 1' })).toBe(true);
  });

  it('should be able to detect a todo', () => {
    expect(isTodo({ _id: 'todo-1', index: 1, section: 'section-1', title: 'todo 1', description: '' })).toBe(true);
  });
});
