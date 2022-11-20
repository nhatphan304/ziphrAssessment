import { NgModule } from '@angular/core';
import { ControlValidityDirective } from './control-validity.directive';

@NgModule({
  declarations: [
    ControlValidityDirective,
  ],
  exports: [
    ControlValidityDirective,
  ],
})
export class ControlValidityModule {
}
