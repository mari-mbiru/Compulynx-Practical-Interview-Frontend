import { Component, Input } from "@angular/core";
import { Transaction, TransactionType } from "../../services/dtos/transactions.dto";
import { HttpClientService } from "../../services/http-client.service";

@Component({
  selector: 'transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrl: './transaction-info.component.scss'
})
export class TransactionInfoComponent {

  @Input()
  transferId!: string;

  transactionDetail?: Transaction;

  transactionType: 'TRANSFER-RECEIEVE' | 'TRANSFER-SEND' | 'WITHDRAW' | 'DEPOSIT' | 'UNKNOWN' = 'UNKNOWN'

  constructor(public httpService: HttpClientService) {

  }

  ngOnInit() {
    this.httpService.getTransactionById(this.transferId).subscribe({
      next: data => {
        this.transactionDetail = data;

        if (this.transactionDetail.transferId) {

          this.transactionType = this.transactionDetail.transactionType === TransactionType.credit ? 'TRANSFER-RECEIEVE' : 'TRANSFER-SEND';
        } else {

          this.transactionType = this.transactionDetail.transactionType === TransactionType.credit ? 'DEPOSIT' : 'WITHDRAW';
        }
      },
      error: () => {
      }
    })
  }
}
