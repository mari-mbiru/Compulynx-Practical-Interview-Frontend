export class TransactionDto {
    uuid!: string
    dateCreated!: Date
    transactionAmount!: number
    transactionType!: TransactionType
    transferId?: string
    transferDetail?: TransferDetail
}

export enum TransactionType {
    credit = "CREDIT",
    debit = "DEBIT"
}

export class CreateTransactionRequestDto {
    transactionType!: TransactionType
    transactionAmount!: number
    userId!: string
}

export class CreateTransferRequestDto {
    transferAmount!: number
    fromCustomerId!: string
    toCustomerId!: string
}

export class TransferDetail {
    transferAccountId!: string
    transferAccountName!: string
}