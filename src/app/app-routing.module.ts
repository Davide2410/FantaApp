import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { EnterLegaComponent } from './components/lega/enter-lega/enter-lega.component';
import { ModificaComponent } from './components/lega/enter-lega/modifica/modifica.component';
import { ImpostazioniComponent } from './components/lega/impostazioni/impostazioni.component';
import { ModificaLegaComponent } from './components/lega/modifica-lega/modifica-lega.component';
import { PartecipantiComponent } from './components/lega/partecipanti/partecipanti.component';
import { LoginComponent } from './components/login/login/login.component';
import { AllComponent } from './components/news/all/all.component';
import { DettaglioComponent } from './components/news/dettaglio/dettaglio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register/register.component';
import { DettaglioGiocatoreComponent } from './components/rosa/dettaglio-giocatore/dettaglio-giocatore.component';
import { RosaComponent } from './components/rosa/rosa.component';
import { SearchLegaComponent } from './components/search-lega/search-lega.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

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
    path:'welcome',
    component: WelcomeComponent
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
    path: 'impostazioni',
    component: ImpostazioniComponent
  },
  {
    path: 'searchLega',
    component: SearchLegaComponent
  },
  {
    path: 'lega',
    component: EnterLegaComponent
  },
  {
    path: 'modifica',
    component: ModificaComponent
  },
  {
    path: 'impostazioni/lega',
    component: ModificaLegaComponent
  },
  {
    path: 'partecipanti',
    component: PartecipantiComponent
  },
  {
    path: 'rose',
    component: RosaComponent
  },
  {
    path: 'details/:id',
    component: DettaglioGiocatoreComponent
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
