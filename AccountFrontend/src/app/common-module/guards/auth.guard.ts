import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.isAuthenticated()) {
            return true; // Allow navigation
        } else {
            // Redirect to login page or another route if not authenticated
            this.router.navigate(['/login']);
            return false;
        }
    }
}