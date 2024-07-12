import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, first, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  active: string = "login";

  firstName: string = "";
  lastName: string = "";
  customerId: string = "";
  customerPin: string = "";
  email: string = "";

  registerSuccess = false;
  isLoading = false;

  loginDetails?: {
    username: string,
    password: string
  } = undefined;

  private unsubscribe$ = new Subject<void>();

  constructor(private authenticationService: AuthService, private router: Router) { }


  onLoginTab(): void {
    this.active = "login";

    if (this.registerSuccess) {
      this.customerId = this.loginDetails?.username ? this.loginDetails.username : "";
      this.customerPin = this.loginDetails?.password ? this.loginDetails.password : "";
    }
  }

  onRegisterTab(): void {
    this.active = "register";
  }

  onSubmitLogin(): void {
    console.log("maybe some funny business here")
    this.isLoading = true;
    this.authenticationService.logIn(this.customerId, this.customerPin)
      .subscribe({
        next: (response) => {
          if (!!response) {
            console.log('navigating oh')
            this.router.navigate(['/'], { skipLocationChange: false, replaceUrl: false })
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error)
        },
      }
      );
  }

  onSubmitRegister(): void {
    this.isLoading = true;

    var dto = { customerId: this.customerId, email: this.email, firstName: this.firstName, lastName: this.lastName }
    this.authenticationService.register(dto)
      .subscribe(
        {
          next: (response) => {
            if (response) {
              this.loginDetails = {
                password: response.customerDetail?.customerPin ? response.customerDetail.customerPin : "",
                username: response.customerDetail?.userID ? response.customerDetail.userID : ""
              }
            }
            this.registerSuccess = true;
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
            console.log(error)
          },
        }
      );
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
