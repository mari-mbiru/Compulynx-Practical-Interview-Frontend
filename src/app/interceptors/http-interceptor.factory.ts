import { inject } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpErrorResponse,
    HttpHandlerFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// Intercept error responses from the http client to display a message to the user through an alert window 
export function httpErrorInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(catchError((error: HttpErrorResponse) => {

        const authToken = inject(AuthService);
        let errorMessage: string;

        if (error.status == 401 || error.status == 403) {
            errorMessage = 'You are currently logged out! You must log in to proceed';
            alert(errorMessage);
            authToken.logOut()
            return throwError(() => new Error(errorMessage));
        }

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Client-side error: There are was an error in the application`;
        } else {
            errorMessage = `Server-side error: ${error.status} Check that the application is running and try again`;
        }
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
    }));
}

//Intercept requests to the backend and add the bearer token
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    const authToken = inject(AuthService).getAccountDetails()?.accessToken;

    if (shouldExcludeFromAuthorization(req.url)) {
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return next(authReq);
}

function shouldExcludeFromAuthorization(url: string): boolean {

    const excludedUrls = ['/auth/authenticate', '/auth/register'];
    return excludedUrls.some(excludedUrl => url.endsWith(excludedUrl));
}
