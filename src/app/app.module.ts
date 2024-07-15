import { NgModule } from "@angular/core";
import { AppComponent } from "./components/app.component";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppHeaderComponent } from "./components/header/app-header.component";
import { LoginComponent } from "./components/login/login.component";
import { MiniStatementComponent } from "./components/mini-statement/mini-statement.component";
import { TransactionInfoComponent } from "./components/transaction-info/transaction-info.component";
import { httpErrorInterceptorFn, authInterceptor } from "./interceptors/http-interceptor.factory";
import { AuthService } from "./services/auth.service";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TransferDialogComponent } from "./components/dialogs/transfer-dialog/transfer-dialog.component";
import { TransactionDialogComponent } from "./components/dialogs/transaction-dialog/transaction-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    LoginComponent,
    DashboardComponent,
    MiniStatementComponent,
    TransactionDialogComponent,
    TransferDialogComponent,
    TransactionInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
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