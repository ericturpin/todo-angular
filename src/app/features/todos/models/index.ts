import Section from './section.model';
import Tag from './tag.model';
import Todo from './todo.model';

export { Section, Tag, Todo };

export type MoveableObject = Section | Todo;

export function isSection(obj: MoveableObject): obj is Section {
  return !obj.hasOwnProperty('section');
}

export function isTodo(obj: MoveableObject): obj is Todo {
  return obj.hasOwnProperty('section');
}

