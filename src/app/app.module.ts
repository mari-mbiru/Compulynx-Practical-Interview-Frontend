import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app-components/app.component";
import { AppHeaderComponent } from "./app-components/app-header/app-header.component";
import { AppRoutingModule } from "./app-routing.module";
import { ContentComponent } from "./app-components/content/content.component";
import { LoginComponent } from './app-components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./app-components/dashboard/dashboard.component";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { authInterceptor, httpErrorInterceptorFn } from "./interceptors/http-interceptor.factory";
import { AuthService } from "./services/auth.service";
import { TransactionDialogComponent } from './app-components/dialogs/transaction-dialog/transaction-dialog.component';
import { TransferDialogComponent } from './app-components/dialogs/transfer-dialog/transfer-dialog.component';
import { MiniStatementComponent } from "./app-components/mini-statement/mini-statement.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentComponent,
    AppHeaderComponent,
    LoginComponent,
    DashboardComponent,
    MiniStatementComponent,
    TransactionDialogComponent,
    TransferDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    provideHttpClient(
      withFetch(),
      withInterceptors([httpErrorInterceptorFn, authInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }