import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Customer } from '../../../services/dtos/customer.dto';
import { HttpClientService } from '../../../services/http-client.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrl: './transfer-dialog.component.scss'
})
export class TransferDialogComponent {

  destroyed$ = new Subject();

  dropdownVisible = false;

  suggestions: Customer[] = [];

  formGroup = this.formBuilder.group({
    userId: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0)]],
    typedName: ['']
  });

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: string,
    private httpClient: HttpClientService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.getCustomerSuggestions()
  }

  getCustomerSuggestions(): void {
    this.formGroup.get('typedName')?.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroyed$),
      switchMap((value) => this.httpClient.getCustomers(value ? value : ''))
    ).subscribe(
      {
        next: (response: Customer[]) => {

          this.suggestions = [...response.filter(customer => !(customer.customerId === this.data))]
        },
        error: () => {
          this.suggestions = []
        }
      }
    )
  }

  showDropdown() {
    console.log('making dropdown visible')
    this.dropdownVisible = true;
    this.formGroup.get('userId')?.patchValue('');
  }

  selectCustomer(customer: Customer) {
    console.log('making dropdown not visible')
    this.dropdownVisible = false;
    this.formGroup.get('userId')?.patchValue(customer.customerId);
  }

  onFocusOut() {
    console.log('making dropdown not visible')
    this.dropdownVisible = false;
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
