import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ExploreComponent } from './dashboard/explore/explore.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { PostComponent } from './dashboard/post/post.component';
import { ReelsComponent } from './dashboard/reels/reels.component';
import { SearchComponent } from './dashboard/search/search.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './dashboard/account/account.component';

const routes: Routes = [
  {
    path: '',redirectTo: 'user/login',pathMatch: 'full'
  },
  {
    path: 'user/login',component: LoginComponent
  },
  {
    path: 'user/register',component: RegisterComponent
  },
  {
    path: 'user/dashboard',component: DashboardComponent
  },
  {
    path: 'user/forgot-pwd',component: ForgotPwdComponent
  },
  {
    path: 'user/profile',component: ProfileComponent
  },
  {
    path: 'user/account',component: AccountComponent
  },
  {
    path: 'user/explore',component: ExploreComponent
  },
  {
    path: 'user/messages',component: MessagesComponent
  },
  {
    path: 'user/notifications',component: NotificationsComponent
  },
  {
    path: 'user/post',component: PostComponent
  },
  {
    path: 'user/reels',component: ReelsComponent
  },
  {
    path: 'user/search',component: SearchComponent
  },
  {
    path: 'user/settings',component: SettingsComponent
  },
  {
    path: 'user/logout',component: LogoutComponent
  },
  {
    path: '**',component: LoginComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
