import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('this.canActivate', this.authService.isAuthenticated())
        if (this.authService.isAuthenticated()) {
            console.log('is authenticated', this.authService.isAuthenticated())
            return true; // Allow navigation
        } else {
            // Redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
    }
}