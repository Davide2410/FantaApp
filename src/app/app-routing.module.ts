import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { EnterLegaComponent } from './components/lega/enter-lega/enter-lega.component';
import { ListoneComponent } from './components/lega/enter-lega/listone/listone.component';
import { ModificaComponent } from './components/lega/enter-lega/modifica/modifica.component';
import { MyTeamComponent } from './components/lega/enter-lega/my-team/my-team.component';
import { DettaglioTeamComponent } from './components/lega/enter-lega/dettaglio-team/dettaglio-team.component';

import { SvincolatiComponent } from './components/lega/enter-lega/svincolati/svincolati.component';
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
import { TrovaComponent } from './components/lega/enter-lega/trova/trova.component';

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
    path: 'lega/:id',
    component: EnterLegaComponent
  },
  {
    path: 'modifica/:id',
    component: ModificaComponent
  },
  {
    path: 'impostazioni/lega/:id',
    component: ModificaLegaComponent
  },
  {
    path: 'partecipanti/:id',
    component: PartecipantiComponent
  },
  {
    path: 'rose/:id',
    component: RosaComponent
  },
  {
    path: 'listone',
    component: ListoneComponent
  },
  {
    path: 'details/:id',
    component: DettaglioGiocatoreComponent
  },
  {
    path: 'myTeam/:id',
    component: MyTeamComponent
  },
  {
    path: 'dettaglioTeam/:id/:idLega',
    component: DettaglioTeamComponent
  },
  {
    path: 'svincolati/:id',
    component: SvincolatiComponent
  },
  {
    path: 'trova/:id',
    component: TrovaComponent
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
