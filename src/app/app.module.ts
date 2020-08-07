import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CovidComponent } from './covid/covid.component';
import { CovidStaticsComponent } from './covid-statics/covid-statics.component';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    CovidComponent,
    CovidStaticsComponent,
    IndexComponent,
    MapComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    ChartsModule,
    RouterModule.forRoot([
      {path:'',component:IndexComponent},
      {path:'bycountry',component:CovidComponent},
      {path:'covid-statics/:country',component:CovidStaticsComponent},
      {path:'map',component:MapComponent},
      {path:'about',component:AboutComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
