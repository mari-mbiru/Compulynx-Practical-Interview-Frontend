import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Customer, CustomerAuthenticationRequestDTO, CustomerAuthenticationResponseDTO, CustomerRegistrationRequestDTO, CustomerRegistrationResponseDTO } from "./dtos/customer.dto";
import { AccountBalanceResposne } from "./dtos/account.dto";
import { CreateTransactionRequestDto, CreateTransferRequestDto, Transaction } from "./dtos/transactions.dto";

@Injectable({ providedIn: "root" })
export class HttpClientService {

    private apiUrl = 'http://localhost:8080/api/v1';

    constructor(private http: HttpClient) { }

    register(payload: CustomerRegistrationRequestDTO):
        Observable<CustomerRegistrationResponseDTO> {

        return this.http.post<CustomerRegistrationResponseDTO>(`${this.apiUrl}/auth/register`, payload);
    }

    authenticate(payload: CustomerAuthenticationRequestDTO):
        Observable<CustomerAuthenticationResponseDTO> {

        return this.http.post<CustomerAuthenticationResponseDTO>(`${this.apiUrl}/auth/authenticate`, payload);
    }

    logOut(): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.apiUrl}/auth/logout`, null, { observe: 'response' });
    }

    getBalance(customerId: string): Observable<AccountBalanceResposne> {
        return this.http.get<AccountBalanceResposne>(`${this.apiUrl}/customers/${customerId}/balance`)
    }

    getMiniStatement(customerId: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}/customers/${customerId}/mini-statement?`)
    }

    getCustomers(name?: string, limit = 10): Observable<Customer[]> {

        let params = new HttpParams();
        params = params.set('limit', limit.toString());
        if (name !== null && name !== undefined) {
            params = params.set('customerName', name);
        }

        return this.http.get<Customer[]>(`${this.apiUrl}/customers`, { params: params })
    }
    createTransaction(payload: CreateTransactionRequestDto): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(`${this.apiUrl}/accounts/transaction`, payload, { observe: "response" })
    }

    createTransfer(payload: CreateTransferRequestDto): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(`${this.apiUrl}/accounts/transfer`, payload, { observe: "response" })
    }

    getTransactionById(transactionId: string): Observable<Transaction> {
        return this.http.get<Transaction>(`${this.apiUrl}/transactions/${transactionId}`)
    }

}