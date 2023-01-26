import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesTableComponent } from './components/companies-table/companies-table.component';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuantitativeDataComponent } from './components/quantitative-data/quantitative-data.component';
import { ChartGeneratorComponent } from './components/chart-generator/chart-generator.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AdminLoginService } from './services/admin-login.service';
import { MultiCompaniesTable } from './components/multi-companies/multi-companies-table.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, /*canActivate: [AdminLoginService]*/ },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'aziende', component: CompaniesTableComponent, /*canActivate: [AdminLoginService]*/ },
  { path: 'aziende/:companyName', component: QuantitativeDataComponent, /*canActivate: [AdminLoginService] */ },
  //{ path: 'dashboard', component: DashboardComponent },
  //{ path: 'charts', component: ChartGeneratorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'companies-selection', component: MultiCompaniesTable },
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
