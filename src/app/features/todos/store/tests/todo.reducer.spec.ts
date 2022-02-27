import Todo from '../../models/todo.model';
import * as fromTodo from '../../store';

describe('Todo reducer', () => {
  const todos: Todo[] = [1, 2, 3].map(i => ({ _id: `todo-${i}`, title: `todo ${i}`, state: 'done', description: '', index: i }));
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

  it('should be able to update a todo', () => {
    const todoToModify = { ...todos[0], title: 'toto' };

    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    state = fromTodo.reducer(state, fromTodo.updateTodo({ update: { id: todoToModify._id, changes: todoToModify } }));
  
    expect(state.todos.entities[todoToModify._id]?.title).toEqual('toto');
  });

  it('should be able to selectLoading', () => {
    expect(fromTodo.selectLoading.projector({ loading: true })).toBe(true);
    expect(fromTodo.selectLoading.projector({ loading: false })).toBe(false);
  });

  it('should be able to selectTodos', () => {
    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    expect(fromTodo.selectTodos.projector(state)).toEqual(todos);

    const newTodos = todos.map((todo, i) => ({ ...todo, index: todos.length - i }));

    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos: newTodos }));
    // todos must be sorted by index
    expect(fromTodo.selectTodos.projector(state)).toEqual(newTodos.reverse());
  });
});
