import { Component } from "@angular/core";
import { UserProfileDto } from "../../services/dtos/customer.dto";
import { AuthService } from "../../services/auth.service";
import { HttpClientService } from "../../services/http-client.service";
import { TransactionDialogComponent } from "../dialogs/transaction-dialog/transaction-dialog.component";
import { TransferDialogComponent } from "../dialogs/transfer-dialog/transfer-dialog.component";
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  userDetail: UserProfileDto | null = null;
  accountBalance: number | null = null;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClientService,
    public dialog: Dialog
  ) {
    this.userDetail = this.authService.getUserDetails();
  }

  ngOnInit(): void {
    this.fetchAccountInfo();
  }

  fetchAccountInfo(): void {
    if (this.userDetail?.userID) {
      this.isLoading = true;
      this.httpClient.getBalance(this.userDetail?.userID)
        .subscribe(
          {
            next: (response) => {
              if (response) {
                this.accountBalance = response.accountBalance;
              }

              this.isLoading = false;
            },
            error: (error) => {
              this.isLoading = false;

            },
          }
        );
    }
  }

  openTransactionDialog(actionType: 'DEBIT' | 'CREDIT'): void {
    const dialogRef = this.dialog.open<string>(TransactionDialogComponent, {
      width: '250px',
      data: actionType,
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.refresh()
      }
    });
  }

  openTransferDialog() {
    const dialogRef = this.dialog.open<string>(TransferDialogComponent, {
      width: '250px',
      data: this.userDetail?.userID,
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.refresh()
      }
    });
  }

  refresh() {
    this.fetchAccountInfo();
  }

  logOut() {
    this.authService.logOut();
  }
}
