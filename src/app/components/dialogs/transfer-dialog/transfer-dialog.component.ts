import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from "@angular/core";
import { Subject, debounceTime, takeUntil, switchMap } from "rxjs";
import { CustomerDto } from "../../../services/dtos/customer.dto";
import { HttpClientService } from "../../../services/http-client.service";
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrl: './transfer-dialog.component.scss'
})
export class TransferDialogComponent {

  destroyed$ = new Subject();

  dropdownVisible = false;

  suggestions: CustomerDto[] = [];

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
        next: (response: CustomerDto[]) => {
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
          next: (response: CustomerDto[]) => {
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

  selectCustomer(customer: CustomerDto) {
    this.dropdownVisible = false;
    this.formGroup.patchValue({
      typedName: customer.customerName,
      userId: customer.customerId
    })

    console.log(this.formGroup)
  }

  onFocusOut() {
    this.dropdownVisible = false;
  }

  onSubmitAmount() {
    this.isLoading = true
    var formValue = this.formGroup.value
    this.httpClient.createTransfer({ fromCustomerId: this.data, toCustomerId: formValue.userId as string, transferAmount: formValue.amount as number })
      .subscribe({
        next: response => {
          this.isLoading = false;
          if (response.ok) {
            this.dialogRef.close('success')
          }
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }



  close() {
    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
