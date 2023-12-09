import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SearchComponent } from './dashboard/search/search.component';
import { ExploreComponent } from './dashboard/explore/explore.component';
import { ReelsComponent } from './dashboard/reels/reels.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { PostComponent } from './dashboard/post/post.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { TokeninterceptorService } from './services/tokeninterceptor.service';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './dashboard/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ForgotPwdComponent,
    ProfileComponent,
    SearchComponent,
    ExploreComponent,
    ReelsComponent,
    MessagesComponent,
    NotificationsComponent,
    PostComponent,
    SettingsComponent,
    LogoutComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
