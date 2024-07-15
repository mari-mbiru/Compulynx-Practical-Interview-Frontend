import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    //Checks if the user is logged in using the AuthService
    canActivate(): boolean {

        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            // Redirect to login page if they are not authenticated
            this.router.navigate(['/login']);
            return false;
        }
    }
}