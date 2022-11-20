import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlValidityModule } from '../shared/directives/control-validity.module';
import { RequiredErrorModule } from '../shared/pipes/required-error/required-error.module';
import { CreateTodoRoutingModule } from './create-todo-routing.module';
import { CreateTodoComponent } from './create-todo.component';

@NgModule({
  declarations: [
    CreateTodoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateTodoRoutingModule,
    RequiredErrorModule,
    ControlValidityModule,
  ],
})
export class CreateTodoModule {
}
