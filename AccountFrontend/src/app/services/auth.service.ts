import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import { LocalStorageService } from "./local-storage.service";
import { CustomerAuthenticationResponseDTO, CustomerRegistrationRequestDTO, CustomerRegistrationResponseDTO, UserProfileDTO } from "./dtos/customer.dto";
import { Observable, tap } from "rxjs";
import * as jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class AuthService {



    constructor(private router: Router, private httpClient: HttpClientService, private localStorageService: LocalStorageService) {

    }

    isAuthenticated(): boolean {
        let userData = this.localStorageService.get('user');
        let userDetail = JSON.parse(userData ? userData : "") as CustomerAuthenticationResponseDTO;

        if (!!userDetail && userDetail.accessToken!!) {
            return !this.isExpired(userDetail.accessToken)
        }

        return false;
    }

    logIn(username: string, password: string): Observable<CustomerAuthenticationResponseDTO> {
        return this.httpClient.authenticate({ userID: username, userPin: password }).pipe(
            tap((response: CustomerAuthenticationResponseDTO) => {
                if (response.customerDetail) {
                    localStorage.setItem('user', JSON.stringify(response));
                }
            })
        )
    }

    register(customer: CustomerRegistrationRequestDTO): Observable<CustomerRegistrationResponseDTO> {
        return this.httpClient.register(customer)
    }

    isExpired(accessToken: string): boolean {
        var token = this.getDecodeToken(accessToken);
        console.log('decoded token', token)
        const expiryTime = token.exp;
        if (expiryTime) {
            return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        } else {
            return false;
        }

    }

    getDecodeToken(accessToken: string): jwt_decode.JwtPayload {
        var token = jwt_decode.jwtDecode(accessToken);
        return jwt_decode.jwtDecode(accessToken);
    }

    goToLogin() {

        if (this.router.url.indexOf("login") === -1) {
            this.router.navigate(['/', 'login'])

        }
    }
}


