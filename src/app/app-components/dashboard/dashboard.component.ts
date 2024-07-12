import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClientService } from '../../services/http-client.service';
import { CustomerAuthenticationResponseDTO, UserProfileDTO } from '../../services/dtos/customer.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userDetail: UserProfileDTO | null = null;
  accountBalance: number | null = null;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClientService
  ) {
    this.userDetail = this.authService.getUserDetails();
  }

  ngOnInit(): void {
    this.fetchAccountInfo();
  }

  fetchAccountInfo(): void {

    this.isLoading = true;

    if (this.userDetail?.userID) {
      this.httpClient.getBalance(this.userDetail?.userID)
        .subscribe(
          {
            next: (response) => {
              if (response) {
                this.accountBalance = response.accountBalance;
              }

              this.isLoading = false;
            },
            error: (error) => {
              this.isLoading = false;

            },
          }
        );
    }
  }


  logOut() {
    this.authService.logOut();
  }
}
