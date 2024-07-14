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
    amount: [0, [Validators.required, Validators.min(0.0001)]],
    typedName: ['']
  });
  isLoading = false;


  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: string,
    private httpClient: HttpClientService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.getCustomerSuggestions()
    this.getCustomers();
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

  getCustomers() {
    this.httpClient.getCustomers()
      .subscribe(
        {
          next: (response: Customer[]) => {
            console.log(this.suggestions)
            this.suggestions = [...response.filter(customer => !(customer.customerId === this.data))]
          },
          error: () => {
            this.suggestions = []
          }
        }
      )
  }

  showDropdown() {
    this.dropdownVisible = true;
    this.formGroup.get('userId')?.patchValue('');
  }

  selectCustomer(customer: Customer) {
    console.log('making dropdown not visible')
    this.dropdownVisible = false;
    this.formGroup.patchValue({
      typedName: customer.customerName,
      userId: customer.customerId
    })

    console.log(this.formGroup)
  }

  onFocusOut() {
    console.log('making dropdown not visible')
    this.dropdownVisible = false;
  }

  onSubmitAmount() {
    this.isLoading = true
    var formValue = this.formGroup.value
    this.httpClient.createTransfer({ fromCustomerId: this.data, toCustomerId: formValue.userId as string, transferAmount: formValue.amount as number })
      .subscribe(
        response => {
          this.isLoading = false;
          if (response.ok) {
            this.dialogRef.close('success')
          }
        }
      )
  }



  close() {
    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
