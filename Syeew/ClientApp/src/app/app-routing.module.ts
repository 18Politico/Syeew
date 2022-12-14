import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesTableComponent } from './components/companies-table/companies-table.component';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuantitativeDataComponent } from './components/quantitative-data/quantitative-data.component';
import { ChartComponent } from './components/chart/chart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'aziende', component: CompaniesTableComponent },
  { path: 'aziende/:companyName', component: QuantitativeDataComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'charts', component: ChartComponent },
  // {
  //   path: 'navbar', component: NavbarComponent, children: [
  //     { path: 'aziende', component: CompaniesTableComponent },
  //     { path: 'aziende/:companyName', component: QuantitativeDataComponent },
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'charts', component: ChartComponent },
  //   ]
  // },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
