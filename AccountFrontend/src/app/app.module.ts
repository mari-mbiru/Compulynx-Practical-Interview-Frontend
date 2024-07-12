import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app-components/app.component";
import { AppHeaderComponent } from "./app-components/app-header/app-header.component";
import { AppRoutingModule } from "./app-routing.module";
import { ContentComponent } from "./app-components/content/content.component";
import { LoginComponent } from './app-components/login/login.component';
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./app-components/dashboard/dashboard.component";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { authInterceptor, httpErrorInterceptorFn } from "./interceptors/http-interceptor.factory";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentComponent,
    AppHeaderComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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