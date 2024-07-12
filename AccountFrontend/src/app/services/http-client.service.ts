import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { CustomerAuthenticationRequestDTO, CustomerAuthenticationResponseDTO, CustomerRegistrationRequestDTO, CustomerRegistrationResponseDTO } from "./dtos/customer.dto";
import { AccountBalanceResposne } from "./dtos/account.dto";

@Injectable({ providedIn: "root" })
export class HttpClientService {

    private apiUrl = 'http://localhost:8080/api/v1'; // Example API URL

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


    // GET request example
    getPosts(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl)
            .pipe(
                map(response => response),
                // catchError(this.handleError)
            );
    }

    // POST request example
    createPost(postData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, postData)
            .pipe(
            // catchError(this.handleError)
        );
    }

    // PUT request example
    updatePost(postId: number, postData: any): Observable<any> {
        const url = `${this.apiUrl}/${postId}`;
        return this.http.put<any>(url, postData)
            .pipe(
            // catchError(this.handleError)
        );
    }

    // DELETE request example
    deletePost(postId: number): Observable<any> {
        const url = `${this.apiUrl}/${postId}`;
        return this.http.delete<any>(url)
            .pipe(
            // catchError(this.handleError)
        );
    }

    // Error handling method
    private handleError(error: any) {
        console.error('An error occurred:', error);
        throw error; // You can customize error handling here as needed
    }

}