import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import { LocalStorageService } from "./local-storage.service";
import { CustomerAuthenticationResponseDto, CustomerRegistrationRequestDto, CustomerRegistrationResponseDto, UserProfileDto } from "./dtos/customer.dto";
import { Observable, tap } from "rxjs";
import * as jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private router: Router,
        private httpClient: HttpClientService,
        private localStorageService: LocalStorageService
    ) { }

    //Get logged in account details from local storage. Return null if none are found
    getAccountDetails(): CustomerAuthenticationResponseDto | null {
        const userData = this.localStorageService.get('user');
        return userData ? JSON.parse(userData) as CustomerAuthenticationResponseDto : null;
    }

    //Get logged in account details from local storage, return only the user profile. Return null if none are found
    getUserDetails(): UserProfileDto | null {
        const accountDetails = this.getAccountDetails();
        return accountDetails?.customerDetail ?? null;
    }

    //Check if there is a logged in user. Checks that there is a stored token and if the token has expired.
    isAuthenticated(): boolean {
        const accountDetails = this.getAccountDetails();
        return !!accountDetails && !!accountDetails.accessToken && !this.isExpired(accountDetails.accessToken);
    }

    //Calls the http client to authenticate the user. If successful the user details are stored in local storage
    logIn(username: string, password: string): Observable<CustomerAuthenticationResponseDto> {
        return this.httpClient.authenticate({ userID: username, userPin: password }).pipe(
            tap((response: CustomerAuthenticationResponseDto) => {
                if (response.customerDetail) {
                    localStorage.setItem('user', JSON.stringify(response));
                }
            })
        );
    }

    //Calls the http client to register a new user
    register(customer: CustomerRegistrationRequestDto): Observable<CustomerRegistrationResponseDto> {
        return this.httpClient.register(customer);
    }

    //Calls the http client to log out the user. Also deletes saved user information from local storage
    logOut(): void {
        this.httpClient.logOut().subscribe();
        localStorage.removeItem('user');
        this.goToLogin();
    }

    //Checks if the stored user token is expired.
    isExpired(accessToken: string): boolean {
        const token = this.getDecodeToken(accessToken);
        const expiryTime = token?.exp ?? 0;
        return (expiryTime * 1000) < Date.now();
    }

    //Decodes the JWT token.
    getDecodeToken(accessToken: string): jwt_decode.JwtPayload {
        return jwt_decode.jwtDecode(accessToken);
    }

    //Redirects the user to the login page if they are not on it already.
    goToLogin(): void {
        console.log(!this.router.url.includes("login"))
        if (!this.router.url.includes("login")) {
            this.router.navigate(['/', 'login']);
        }
    }
}


