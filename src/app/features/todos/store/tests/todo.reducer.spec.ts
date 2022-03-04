import { Section, Tag } from '../../models';
import Todo from '../../models/todo.model';
import * as fromTodo from '../../store';

describe('Todo reducer', () => {
  const sections = [{ _id: 'section-1', index: 0, title: 'to do' }, { _id: 'section-2', index: 1, title: 'done' }];
  const tags = [{ _id: 'tag-1', title: 'tag 1', color: '#aaa' }];
  const todos: Todo[] = [
    { _id: 'todo-1', title: 'todo 1', section: 'done', description: '', index: 1 },
    { _id: 'todo-2', title: 'todo 2', section: 'to do', description: '', index: 2 }
  ];
  let state: fromTodo.State;

  beforeEach(() => {
    state = fromTodo.initialState;
  });

  it('should be able to update the loading state', () => {
    state = fromTodo.reducer(state, fromTodo.loading({ loading: true }));
    
    expect(state.loading).toBe(true);
  });

  it('should be able to load the sections', () => {
    state = fromTodo.reducer(state, fromTodo.sectionsLoaded({ sections }));
    const sectionsFromStore = state.sections.ids.map(id => state.sections.entities[id]) as Section[];

    expect(sections).toEqual(sectionsFromStore);
  });

  it('should be able to add a section', () => {
    const sectionToAdd = sections[0] as Section;

    state = fromTodo.reducer(state, fromTodo.addSection({ section: sectionToAdd }));
    
    expect(state.sections.entities[sectionToAdd._id]).toEqual(sectionToAdd);
  });
  
  it('should be able to update a section', () => {
    const sectionToModify = { ...sections[0], title: 'toto' };

    state = fromTodo.reducer(state, fromTodo.sectionsLoaded({ sections }));
    state = fromTodo.reducer(state, fromTodo.updateSections({ updates: [{ id: sectionToModify._id, changes: sectionToModify }] }));
  
    expect(state.sections.entities[sectionToModify._id]?.title).toEqual('toto');
  });

  it('should be able to load the todos', () => {
    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    const todosFromStore = state.todos.ids.map(id => state.todos.entities[id]) as Todo[];

    expect(todos).toEqual(todosFromStore);
  });

  it('should be able to add a todo', () => {
    const todoToAdd = todos[0] as Todo;

    state = fromTodo.reducer(state, fromTodo.addTodo({ todo: todoToAdd }));
    
    expect(state.todos.entities[todoToAdd._id]).toEqual(todoToAdd);
  });

  it('should be able to update a todo', () => {
    const todoToModify = { ...todos[0], title: 'toto' };

    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    state = fromTodo.reducer(state, fromTodo.updateTodos({ updates: [{ id: todoToModify._id, changes: todoToModify }] }));
  
    expect(state.todos.entities[todoToModify._id]?.title).toEqual('toto');
  });

  it('should be able to selectLoading', () => {
    expect(fromTodo.selectLoading.projector({ loading: true })).toBe(true);
    expect(fromTodo.selectLoading.projector({ loading: false })).toBe(false);
  });

  it('should be able to selectSections', () => {
    state = fromTodo.reducer(state, fromTodo.sectionsLoaded({ sections }));
    expect(fromTodo.selectSections.projector(state)).toEqual(sections);

    const newSections = sections.map((section, i) => ({ ...section, index: sections.length - i }));

    state = fromTodo.reducer(state, fromTodo.sectionsLoaded({ sections: newSections }));
    // sections must be sorted by index
    expect(fromTodo.selectSections.projector(state)).toEqual(newSections.reverse());
  });

  it('should be able to selectTodos', () => {
    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    expect(fromTodo.selectTodos.projector(state)).toEqual(todos);

    const newTodos = todos.map((todo, i) => ({ ...todo, index: todos.length - i }));

    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos: newTodos }));
    // todos must be sorted by index
    expect(fromTodo.selectTodos.projector(state)).toEqual(newTodos.reverse());
  });

  it('should be able to selectTodosBySection', () => {
    state = fromTodo.reducer(state, fromTodo.sectionsLoaded({ sections }));
    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));

    const selectSections = fromTodo.selectSections.projector(state);
    const selectTodos = fromTodo.selectTodos.projector(state);
    const expectedResult = {
      'done': [ todos[0] ],
      'to do': [ todos[1] ]
    };
    
    expect(fromTodo.selectTodosBySection.projector(selectSections, selectTodos)).toEqual(expectedResult);
  });

  it('should be able to selectOpenedTodo', () => {
    state = fromTodo.reducer(state, fromTodo.todosLoaded({ todos }));
    
    // openedTodoId is defined => expect a Todo
    state = fromTodo.reducer(state, fromTodo.openTodo({ openedTodoId: todos[0]._id }));
    expect(fromTodo.selectOpenedTodo.projector(state)).toEqual(todos[0]);

    // openedTodoId is undefined => expect undefined
    state = fromTodo.reducer(state, fromTodo.openTodo({ openedTodoId: undefined }));
    expect(fromTodo.selectOpenedTodo.projector(state)).toEqual(undefined);
  });

  it('should be able to load the tags', () => {
    state = fromTodo.reducer(state, fromTodo.tagsLoaded({ tags }));
    const tagsFromStore = state.tags.ids.map(id => state.tags.entities[id]) as Tag[];

    expect(tags).toEqual(tagsFromStore);
  });

  it('should be able to add a tag', () => {
    const tagToAdd = tags[0] as Tag;

    state = fromTodo.reducer(state, fromTodo.addTag({ tag: tagToAdd }));
    
    expect(state.tags.entities[tagToAdd._id]).toEqual(tagToAdd);
  });

  it('should be able to update a tag', () => {
    const tagToModify = { ...tags[0], title: 'bug' };

    state = fromTodo.reducer(state, fromTodo.tagsLoaded({ tags }));
    state = fromTodo.reducer(state, fromTodo.updateTags({ updates: [{ id: tagToModify._id, changes: tagToModify }] }));
  
    expect(state.tags.entities[tagToModify._id]?.title).toEqual('bug');
  });

  it('should be able to delete a tag', () => {
    state = fromTodo.reducer(state, fromTodo.tagsLoaded({ tags }));
    state = fromTodo.reducer(state, fromTodo.deleteTag({ tag: tags[0]._id }));
  
    expect(state.tags.entities[tags[0]._id]).toBeFalsy();
  });

  it('should be able to selectTags', () => {
    state = fromTodo.reducer(state, fromTodo.tagsLoaded({ tags }));
    expect(fromTodo.selectTags.projector(state)).toEqual(tags);
  });
});
