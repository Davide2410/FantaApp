import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsComponent } from './components/news/news.component';
import { SecondaryComponent } from './components/news/secondary/secondary.component';
import { DettaglioComponent } from './components/news/dettaglio/dettaglio.component';
import { AllComponent } from './components/news/all/all.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';

import { SwiperModule } from 'swiper/angular';
import { SwiperComponent } from './components/news/all/swiper/swiper.component';
import { HomeNewsComponent } from './components/home/home-news/home-news.component';
import { UltimeNotizieComponent } from './components/home/ultime-notizie/ultime-notizie.component';
import { UltimeSecondaryComponent } from './components/home/ultime-notizie/ultime-secondary/ultime-secondary.component';
import { ConsigliComponent } from './components/home/consigli/consigli.component';
import { ModalComponent } from './modal/modal.component';
import { ImpostazioniComponent } from './components/lega/impostazioni/impostazioni.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SearchLegaComponent } from './components/search-lega/search-lega.component';
import { ModalLegaComponent } from './components/modal-lega/modal-lega.component';
import { EnterLegaComponent } from './components/lega/enter-lega/enter-lega.component';
import { NavbarLegaComponent } from './components/navbar-lega/navbar-lega.component';
import { ModificaComponent } from './components/lega/enter-lega/modifica/modifica.component';
import { ModificaLegaComponent } from './components/lega/modifica-lega/modifica-lega.component';
import { PartecipantiComponent } from './components/lega/partecipanti/partecipanti.component';
import { RosaComponent } from './components/rosa/rosa.component';
import { DettaglioGiocatoreComponent } from './components/rosa/dettaglio-giocatore/dettaglio-giocatore.component';
import { MyTeamComponent } from './components/lega/enter-lega/my-team/my-team.component';
import { ListoneComponent } from './components/lega/enter-lega/listone/listone.component';
import { PlayerComponent } from './components/rosa/player/player.component';
import { SearchPlayerComponent } from './components/rosa/search-player/search-player.component';
import { PlayerListComponent } from './components/lega/enter-lega/listone/player-list/player-list.component';
import { DettaglioTeamComponent } from './components/lega/enter-lega/dettaglio-team/dettaglio-team.component';
import { SvincolatiComponent } from './components/lega/enter-lega/svincolati/svincolati.component';
import { GiocatoreComponent } from './components/lega/enter-lega/svincolati/giocatore/giocatore.component';
import { TrovaComponent } from './components/lega/enter-lega/trova/trova.component';
import { TovaGiocatoreComponent } from './components/lega/enter-lega/trova/tova-giocatore/tova-giocatore.component';
import { TopComponent } from './components/top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    NewsComponent,
    SecondaryComponent,
    DettaglioComponent,
    AllComponent,
    SwiperComponent,
    HomeNewsComponent,
    UltimeNotizieComponent,
    UltimeSecondaryComponent,
    ConsigliComponent,
    ModalComponent,
    ImpostazioniComponent,
    WelcomeComponent,
    SearchLegaComponent,
    ModalLegaComponent,
    EnterLegaComponent,
    NavbarLegaComponent,
    ModificaComponent,
    ModificaLegaComponent,
    PartecipantiComponent,
    RosaComponent,
    DettaglioGiocatoreComponent,
    MyTeamComponent,
    ListoneComponent,
    PlayerComponent,
    SearchPlayerComponent,
    PlayerListComponent,
    DettaglioTeamComponent,
    SvincolatiComponent,
    GiocatoreComponent,
    TrovaComponent,
    TovaGiocatoreComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbCheckboxModule,
    MdbFormsModule,
    MdbCollapseModule,
    MdbTooltipModule,
    SwiperModule,
    MdbDropdownModule,
    MdbModalModule,
    MdbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
