import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nga-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {

  @Output() search = new EventEmitter();
  readonly matcher = new ShowOnFormInvalidStateMatcher();
  readonly searchForm: UntypedFormGroup;

  constructor(fb: UntypedFormBuilder, private router: Router) {
    this.searchForm = fb.group({
      title: [, Validators.minLength(2)],
      minPrice: [, Validators.min(0)],
      maxPrice: [, Validators.min(0)]
    },
      {
        validator: [minLessThanMaxValidator]
      });
  }

  ngOnInit(): void { }

  onSearch(): void {  
    if (this.searchForm.valid) {
      this.search.emit();
      this.router.navigate(
        ['/search'], { queryParams: withoutEmptyValues(this.searchForm.value) }
      );
    }
  }
}

/**Error when either control of the form is invalid. */
export class ShowOnFormInvalidStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | null): boolean {
    return !!((control && control.invalid) || (form && form.hasError('minLessThanMax')));
  }
}

/**
 * removes properties with empty values (everything that's considered
 *  a "falsy" value in javascript) from the original object
 */
function withoutEmptyValues(object: any): any {  
  return Object.keys(object).reduce(
    (queryParams: any, key) => {
      if (object[key]) {
        queryParams[key] = object[key];
      }
      return queryParams;
    }, {});  
}

/**
 * if both values -min and max prices are specified , make sure that
 * the min is less or equal to the max.
 */
function minLessThanMaxValidator(group: UntypedFormGroup): ValidationErrors | null {
  const minPrice = group.controls['minPrice'].value;
  const maxPrice = group.controls['maxPrice'].value;

  if (minPrice && maxPrice) {
    return minPrice <= maxPrice ? null : { minLessThanMax: true };
  } else {
    return null;
  }
}