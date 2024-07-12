import { inject, Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpErrorResponse,
    HttpHandlerFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export function httpErrorInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(catchError((error: HttpErrorResponse) => {
        let errorMessage;

        if (error.status == 401) {
            errorMessage = 'You are currently logged out! You must log in to proceed';
        }

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Client-side error: ${error.error.message}`;
        } else {
            errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }
        console.error(errorMessage);
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
    }));
}


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const authToken = inject(AuthService).getAccountDetails()?.accessToken;

    if (shouldExcludeFromAuthorization(req.url)) {
        return next(req); // Pass the request through unchanged
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
