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
import { SwiperModule } from 'swiper/angular';
import { SwiperComponent } from './components/news/all/swiper/swiper.component';
import { HomeNewsComponent } from './components/home/home-news/home-news.component';
import { UltimeNotizieComponent } from './components/home/ultime-notizie/ultime-notizie.component';
import { UltimeSecondaryComponent } from './components/home/ultime-notizie/ultime-secondary/ultime-secondary.component';
import { ConsigliComponent } from './components/home/consigli/consigli.component';
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
    ConsigliComponent
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
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
