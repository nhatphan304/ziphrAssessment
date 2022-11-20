import { formatDate } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, noop, Subject, switchMap } from 'rxjs';
import { AppService } from '../app.service';
import { TodoPriority } from '../shared/enums/todo-priority';
import { ControlsOf } from '../shared/types/controls-of';
import { TodoForm } from './todo-form';
import { convertTodoFormToTodo } from './todo-form-to-todo.converter';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnDestroy {
  /** Priorities enum */
  public readonly priorities: typeof TodoPriority = TodoPriority;
  /** Create Todo FormGroup */
  public readonly form: FormGroup<ControlsOf<Readonly<TodoForm>>>;
  /** Subscribe submit$ to handle after submit behavior */
  private readonly submit$: Readonly<Subject<void>> = new Subject<void>();

  public constructor(
    private appService: AppService,
    private router: Router,
  ) {
    /** Init formGroup*/
    this.form = this.defineForm();
    this.listenSubmitButton();
  }

  public submitForm(): void {
    /** Trigger create Todo */
    this.submit$.next();
  }

  public ngOnDestroy(): void {
    /** Complete submit$ stream */
    this.submit$.complete();
  }

  private listenSubmitButton(): void {
    this.submit$.pipe(
      /** Stop emission if form is invalid */
      filter(() => !this.form.invalid),
      /** After submit button emits, switchMap to createTodo to keep only one latest createTodo observable valid
       *  if a createTodo observable is active and submit button emits a new value, any previous createTodo observable are cancelled.
       *  */
      switchMap(() => this.appService.createTodo(
        /** Convert form value with all control value todo Todo model */
        convertTodoFormToTodo(this.form.getRawValue()),
      )),
    ).subscribe(
      {
        next: () => {
          /** Navigate to to-do list after save success */
          this.router.navigate(['/']).then(noop);
        },
      },
    );
  }

  private defineForm(): FormGroup<ControlsOf<Readonly<TodoForm>>> {
    /** Convert current date to string with correct format to show on date input */
    const defaultDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    return new FormGroup<ControlsOf<Readonly<TodoForm>>>({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      date: new FormControl<string>(defaultDate, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      done: new FormControl<boolean>(false, {
        nonNullable: true,
      }),
      priority: new FormControl<TodoPriority>(TodoPriority.LOW, {
        nonNullable: true,
      }),
    });
  }
}
