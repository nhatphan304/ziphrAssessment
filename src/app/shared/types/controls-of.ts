import { FormControl, FormGroup } from '@angular/forms';

/**
 * ControlsOf casts a type or interface into a Strong-typed Reactive-form FormGroup's type.
 * Take a Type that extends Record<string, any> as a generic type.
 * Return a type which every property is a key of provided type, and its new type depends on its type (called T for short):
 * - T extends Record<string, any>, its type is either FromGroup<T> or FormControl<T> (with custom Control Value Accessor)
 * - T does not extend Record<string, any>, its type is FormControl<T>
 */
export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any> ? FormGroup<ControlsOf<T[K]>> | FormControl<T[K]> : FormControl<T[K]>;
};
