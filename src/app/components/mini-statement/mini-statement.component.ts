import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Transaction } from "../../services/dtos/transactions.dto";
import { HttpClientService } from "../../services/http-client.service";

@Component({
  selector: 'mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrl: './mini-statement.component.scss'
})
export class MiniStatementComponent {

  isLoading = false;
  transactions: Transaction[] = [];
  expandedRow: number | null = null;



  constructor(private httpClient: HttpClientService, private authService: AuthService) {

  }

  ngOnInit() {
    this.getTransactions()
  }

  getTransactions() {
    this.isLoading = true;

    var userId = this.authService.getUserDetails()?.userID
    if (userId) {
      this.httpClient.getMiniStatement(userId)
        .subscribe(
          {
            next: (value) => {
              this.isLoading = false;
              this.transactions = [...value]
            },

            error: (error) => {
              this.isLoading = false
            }
          }
        )
    }

    this.isLoading = false;
  }

  toggleRow(index: number) {
    if (this.expandedRow === index) {
      this.expandedRow = null;
    } else {
      this.expandedRow = index;
    }
  }

  refresh() {
    this.getTransactions()
  }

  getDetail(transaction: Transaction): string {
    if (transaction.transferId) {
      return transaction.transactionType === 'CREDIT' ? 'TRANSFER IN' : 'TRANSFER OUT';
    } else {
      return transaction.transactionType === 'CREDIT' ? 'DEPOSIT' : 'WITHDRAWAL';
    }
  }

}
