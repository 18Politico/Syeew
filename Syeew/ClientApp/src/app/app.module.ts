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
import { CompaniesTableComponent } from './components/companies-table/companies-table.component';
import { ChartGeneratorComponent } from './components/chart-generator/chart-generator.component';
import { ParametersChartsComponent } from './components/dashboard/parameters-charts/parameters-charts.component';
import { TemporalChartsComponent } from './components/dashboard/temporal-charts/temporal-charts.component';
import { FixedParametersChartsComponent } from './components/dashboard/fixed-parameters-charts/fixed-parameters-charts.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingProgressComponent } from './components/loading-progress/loading-progress.component';
import { AxisSelectionComponent } from './components/dashboard/axis-selection/axis-selection.component';
import { ZoomChartComponent } from './components/dashboard/zoom-chart/zoom-chart.component';
import { LoginComponent } from './components/login/login.component';
import { TableSelectionComponent } from './components/table-selection/table-selection.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProvaComponent } from './components/prova/prova.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    QuantitativeDataComponent,
    ProvaComponent,
    CompaniesTableComponent,
    ChartGeneratorComponent,
    NavbarComponent,
    DashboardComponent,
    ParametersChartsComponent,
    TemporalChartsComponent,
    FixedParametersChartsComponent,
    LoadingProgressComponent,
    AxisSelectionComponent,
    ZoomChartComponent,
    LoginComponent,
    TableSelectionComponent,
    ProvaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //angular material
    MaterialModule,
    NgApexchartsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
