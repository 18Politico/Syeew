import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './modules/material-module/material-module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuantitativeDataComponent } from './components/quantitative-data/quantitative-data.component';
import { ProvaComponent } from './components/prova/prova.component';
import { CompaniesTableComponent } from './components/companies-table/companies-table.component';
import { ChartComponent } from './components/chart/chart.component';

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    QuantitativeDataComponent,
    ProvaComponent,
    CompaniesTableComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // RouterModule.forRoot([
    //   { path: '/home', component: HomeComponent },
    //   { path: '', redirectTo: '/home', pathMatch: 'full' },
    //   { path: '**', component: PageNotFoundComponent },
    //   { path: '/nono', component: PageNotFoundComponent }

    // ]),
    //angular material
    MaterialModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
