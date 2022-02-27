import Todo from '../../models/todo.model';
import * as fromTodo from '../../store';

describe('Todo reducer', () => {
  const todos: Todo[] = [1, 2, 3].map(i => ({ _id: `todo-${i}`, title: `todo ${i}`, state: 'done', description: '' }));
  let state: fromTodo.State;

  beforeEach(() => {
    state = fromTodo.initialState;
  });

  it('should be able to update the loading state', () => {
    state = fromTodo.reducer(state, fromTodo.loading({ loading: true }));
    
    expect(state.loading).toBe(true);
  });

  it('should be able to load the todo items', () => {
    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    const todosFromStore = state.todos.ids.map(id => state.todos.entities[id]) as Todo[];

    expect(todos).toEqual(todosFromStore);
  });

  it('sholud be able to selectLoading', () => {
    expect(fromTodo.selectLoading.projector({ loading: true })).toBe(true);
    expect(fromTodo.selectLoading.projector({ loading: false })).toBe(false);
  });

  it('should be able to selectTodos', () => {
    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    expect(fromTodo.selectTodos.projector(state)).toEqual(todos);
  });
});
