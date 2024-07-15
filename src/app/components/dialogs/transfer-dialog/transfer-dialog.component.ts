import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from "@angular/core";
import { CustomerDto } from "../../../services/dtos/customer.dto";
import { HttpClientService } from "../../../services/http-client.service";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrl: './transfer-dialog.component.scss'
})
export class TransferDialogComponent {

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
    this.getCustomers();
  }

  getCustomers() {
    this.httpClient.getCustomers()
      .subscribe(
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
}
