import { injectMocks, Scenarios } from 'data-mocks';

const scenarios: Scenarios = {
  default: [
    {
      url: /todos/,
      method: 'GET',
      response: [
        {
          _id: 'todo-1',
          title: 'Install Angular Framework',
          description: '',
          state: 'undone',
          index: 0,
        },
        {
          _id: 'todo-2',
          title: 'Install NgRx',
          description: '',
          state: 'undone',
          index: 1,
        },
        {
          _id: 'todo-3',
          title: 'Install Angular Material',
          description: '',
          state: 'undone',
          index: 2,
        },
        {
          _id: 'todo-4',
          title: 'Use ESLint for code quality',
          description: '',
          state: 'undone',
          index: 3,
        },
        {
          _id: 'todo-5',
          title: 'Install data-mocks library to have a mocked backend',
          description: '',
          state: 'undone',
          index: 4,
        },
        {
          _id: 'todo-6',
          title: 'List my TODOs',
          description: `
          #### Description:
  As a user I would like to list my current todos
  #### Acceptance criterias:
  - A loader is displayed while list is being loaded on backend side
  - Each todo item displays its title and state-
  - Some hard-coded todos are initialized in this context for demo purpose`,
          state: 'undone',
          index: 5,
        },
        {
          _id: 'todo-7',
          title: 'Change a TODO state',
          description: `
          #### Description:
  As a user I would like to be able to change a todo's state by checking a "box"
  #### Acceptance criteria:
  - Todo item displays a checkbox beside the title
  - Clicking on this checkbox toggles todo's state (done / undone)
  - When switching from 'done' to 'undone', todo is moved at the bottom of the list, and displayed "crossed out"`,
          state: 'undone',
          index: 6,
        },
        {
          _id: 'todo-8',
          title: 'Detail a TODO',
          description: `
          #### Description:
  As a user I would like to display the details of a todo in a separate or dedicated view.
  #### Acceptance criteria:
  - I can click on a todo item in the list to access its details view
  - Details view displays todo's title, description and state
  - The todo's details view can be accessed via an unique URL`,
          state: 'undone',
          index: 7,
        },
        {
          _id: 'todo-9',
          title: 'Add a new TODO',
          description: `
          #### Description:
  As a user I would like to add a new todo in my list.
  #### Acceptance criteria:
  - A dedicated button gives access to a todo creation form, with 2 fields: title and description
  - Title is required, description is optional
  - A loader is displayed while todo is being created on backend side
  - Once created, the new todo takes place at the top of the list`,
          state: 'undone',
          index: 8,
        },
      ],
      responseCode: 200,
      delay: 1000,
    },
    {
      url: /todos/,
      method: 'PUT',
      response: {},
      responseCode: 200,
      delay: 100,
    }
  ],
};

injectMocks(scenarios);