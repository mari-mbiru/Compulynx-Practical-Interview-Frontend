import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { AppRoutingModule } from "./app-routing.module";
import { ContentComponent } from "./content/content.component";
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommonsModule } from "./common-module/commons.module";

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
    CommonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }