import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import { LocalStorageService } from "./local-storage.service";
import { CustomerAuthenticationResponseDTO, CustomerRegistrationRequestDTO, CustomerRegistrationResponseDTO, UserProfileDTO } from "./dtos/customer.dto";
import { Observable, tap } from "rxjs";
import * as jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";
import { HttpStatusCode } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private router: Router,
        private httpClient: HttpClientService,
        private localStorageService: LocalStorageService
    ) { }

    getAccountDetails(): CustomerAuthenticationResponseDTO | null {
        const userData = this.localStorageService.get('user');
        return userData ? JSON.parse(userData) as CustomerAuthenticationResponseDTO : null;
    }

    getUserDetails(): UserProfileDTO | null {
        const accountDetails = this.getAccountDetails();
        return accountDetails?.customerDetail ?? null;
    }

    isAuthenticated(): boolean {
        const accountDetails = this.getAccountDetails();
        return !!accountDetails && !!accountDetails.accessToken && !this.isExpired(accountDetails.accessToken);
    }

    logIn(username: string, password: string): Observable<CustomerAuthenticationResponseDTO> {
        return this.httpClient.authenticate({ userID: username, userPin: password }).pipe(
            tap((response: CustomerAuthenticationResponseDTO) => {
                if (response.customerDetail) {
                    localStorage.setItem('user', JSON.stringify(response));
                }
            })
        );
    }

    register(customer: CustomerRegistrationRequestDTO): Observable<CustomerRegistrationResponseDTO> {
        return this.httpClient.register(customer);
    }

    logOut(): void {
        this.httpClient.logOut().subscribe();
        localStorage.removeItem('user');
        this.goToLogin();
    }

    isExpired(accessToken: string): boolean {
        const token = this.getDecodeToken(accessToken);
        const expiryTime = token?.exp ?? 0;
        return (expiryTime * 1000) < Date.now();
    }

    getDecodeToken(accessToken: string): jwt_decode.JwtPayload {
        return jwt_decode.jwtDecode(accessToken);
    }

    goToLogin(): void {
        console.log(!this.router.url.includes("login"))
        if (!this.router.url.includes("login")) {
            this.router.navigate(['/', 'login']);
        }
    }
}


