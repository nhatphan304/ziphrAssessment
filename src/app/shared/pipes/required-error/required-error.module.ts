import { NgModule } from '@angular/core';
import { RequiredErrorPipe } from './required-error.pipe';

@NgModule({
  declarations: [
    RequiredErrorPipe,
  ],
  exports: [
    RequiredErrorPipe,
  ],
})
export class RequiredErrorModule {
}
