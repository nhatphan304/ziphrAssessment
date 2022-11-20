import { Todo } from '../shared/interfaces/todo';
import { TodoForm } from './todo-form';

/**
 * Convert value from to-do from to to-do interface
 * @see CreateTodoComponent.listenSubmitButton
 * */
export function convertTodoFormToTodo(model: Readonly<TodoForm>): Readonly<Todo> {
  return {
    title: model.title,
    priority: model.priority,
    done: model.done,
    /** Convert from date string to timestamp */
    date: new Date(model.date).getTime(),
  };
}
