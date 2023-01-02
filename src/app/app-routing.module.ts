import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { AllComponent } from './components/news/all/all.component';
import { DettaglioComponent } from './components/news/dettaglio/dettaglio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register/register.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'dettaglio/:id',
    component: DettaglioComponent
  },
  {
    path: 'all',
    component: AllComponent
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
