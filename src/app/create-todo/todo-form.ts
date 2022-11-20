import { TodoPriority } from '../shared/enums/todo-priority';

/**
 * Represents data structure of a form to create a single to-do.
 * @see CreateTodoComponent.form
 * @see convertTodoFormToTodo
 */

export interface TodoForm {
  /** Title of the task */
  title: string;
  /** Is this task completed/done? */
  done: boolean;
  /** Due date of the task (date string format yyyy-MM-dd) */
  date: string;
  /** Priority of the task */
  priority: TodoPriority;
}
