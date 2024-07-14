import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { AuthService } from '../services/auth.service';
import { Transaction } from '../services/dtos/transactions.dto';

@Component({
  selector: 'mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrl: './mini-statement.component.scss'
})
export class MiniStatementComponent {

  isLoading = false;
  transactions: Transaction[] = [];

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

  refresh() {
    this.getTransactions()
  }

}
