import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { CustomerDto, CustomerAuthenticationRequestDto, CustomerAuthenticationResponseDto, CustomerRegistrationRequestDto, CustomerRegistrationResponseDto } from "./dtos/customer.dto";
import { AccountBalanceResposneDto } from "./dtos/account.dto";
import { CreateTransactionRequestDto, CreateTransferRequestDto, TransactionDto } from "./dtos/transactions.dto";

@Injectable({ providedIn: "root" })
export class HttpClientService {

    private apiUrl = 'http://localhost:8080/api/v1';

    constructor(private http: HttpClient) { }

    register(payload: CustomerRegistrationRequestDto):
        Observable<CustomerRegistrationResponseDto> {

        return this.http.post<CustomerRegistrationResponseDto>(`${this.apiUrl}/auth/register`, payload);
    }

    authenticate(payload: CustomerAuthenticationRequestDto):
        Observable<CustomerAuthenticationResponseDto> {

        return this.http.post<CustomerAuthenticationResponseDto>(`${this.apiUrl}/auth/authenticate`, payload);
    }

    logOut(): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.apiUrl}/auth/logout`, null, { observe: 'response' });
    }

    getBalance(customerId: string): Observable<AccountBalanceResposneDto> {
        return this.http.get<AccountBalanceResposneDto>(`${this.apiUrl}/customers/${customerId}/balance`)
    }

    getMiniStatement(customerId: string): Observable<TransactionDto[]> {
        return this.http.get<TransactionDto[]>(`${this.apiUrl}/customers/${customerId}/mini-statement?`)
    }

    getCustomers(name?: string, limit = 10): Observable<CustomerDto[]> {

        let params = new HttpParams();
        params = params.set('limit', limit.toString());
        if (name !== null && name !== undefined) {
            params = params.set('customerName', name);
        }

        return this.http.get<CustomerDto[]>(`${this.apiUrl}/customers`, { params: params })
    }
    createTransaction(payload: CreateTransactionRequestDto): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(`${this.apiUrl}/accounts/transaction`, payload, { observe: "response" })
    }

    createTransfer(payload: CreateTransferRequestDto): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(`${this.apiUrl}/accounts/transfer`, payload, { observe: "response" })
    }

    getTransactionById(transactionId: string): Observable<TransactionDto> {
        return this.http.get<TransactionDto>(`${this.apiUrl}/transactions/${transactionId}`)
    }

}