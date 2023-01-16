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
import { ParametersChartsComponent } from './components/dashboard/parameters-charts/parameters-charts.component';
import { TemporalChartsComponent } from './components/dashboard/temporal-charts/temporal-charts.component';
import { FixedParametersChartsComponent } from './components/dashboard/fixed-parameters-charts/fixed-parameters-charts.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BoxPlotComponent } from './components/charts/box-plot/box-plot.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { ScatterPlotComponent } from './components/charts/scatter-plot/scatter-plot.component';
import { ColumnChartComponent } from './components/charts/column-chart/column-chart.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    QuantitativeDataComponent,
    ProvaComponent,
    CompaniesTableComponent,
    ChartComponent,
    NavbarComponent,
    DashboardComponent,
    BoxPlotComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    ScatterPlotComponent,
    ColumnChartComponent,
    ParametersChartsComponent,
    TemporalChartsComponent,
    FixedParametersChartsComponent,
    LoadingSpinnerComponent,
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
