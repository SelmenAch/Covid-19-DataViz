import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ByCountryComponent } from './by-country/by-country.component';
import { StatisticsComponent } from './statistics/statistics.component';
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
    ByCountryComponent,
    StatisticsComponent,
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
      {path:'by-country',component:ByCountryComponent},
      {path:'statistics/:country',component:StatisticsComponent},
      {path:'map',component:MapComponent},
      {path:'about',component:AboutComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
