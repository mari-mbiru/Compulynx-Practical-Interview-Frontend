import { Component, Inject } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { TransactionType } from "../../../services/dtos/transactions.dto";
import { HttpClientService } from "../../../services/http-client.service";
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss'
})
export class TransactionDialogComponent {

  isLoading = false;
  dialogType: TransactionType = TransactionType.debit;
  amount = 0;

  get invalidAmount(): boolean {
    return !(this.amount > 0)
  };

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: TransactionType,
    private httpClientService: HttpClientService,
    private authService: AuthService
  ) {
    this.dialogType = data;
  }

  onSubmitAmount() {
    this.isLoading = true

    var userId = this.authService.getUserDetails()?.userID

    if (userId) {
      this.httpClientService.createTransaction({ transactionAmount: this.amount, transactionType: this.dialogType, userId: userId })
        .subscribe({
          next: response => {
            if (response.ok) {
              this.dialogRef.close('success')
            }
          },
          error: () => {
            this.isLoading = false;
          }
        })
    }

    this.isLoading = false;
  }

  close() {
    this.dialogRef.close()
  }

}
