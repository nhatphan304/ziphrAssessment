import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

/**
 * This Directive set a control validity style classes based on its status
 * Add appFormControl on components with formControlName
 * */
@Directive({
  selector: '[appFormControl][formControlName]',
})
export class ControlValidityDirective {
  //Get Host formControlName directive value
  @Input() public formControlName: string = '';

  //Set is-invalid to Host
  @HostBinding('class.is-invalid') get isInvalid(): boolean {
    const control = this.getControl();

    //If control is not found, do not set class
    if (!control) {
      return false;
    }

    //Set Class if control with provided formControlName is invalid with one of these are true: dirty, or touched, or form has been submitted
    return control.invalid && (control.dirty || control.touched || this.formDirective?.submitted);
  }

  //Set is-invalid to Host
  @HostBinding('class.is-valid') get isValid(): boolean {
    const control = this.getControl();

    //If control is not found, do not set class
    if (!control) {
      return false;
    }

    //Set Class if control with provided formControlName is valid with one of these are true: dirty, or touched, or form has been submitted
    return control.valid && (control.dirty || control.touched || this.formDirective?.submitted);
  }

  public constructor(
    //Inject FormGroupDirective from ancestor components
    private formDirective: FormGroupDirective,
  ) {
  }

  private getControl(): AbstractControl | null {
    //Get formControl with provided formControlName from FormGroupDirective
    return this.formDirective.control.get(this.formControlName);
  }
}
