import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dimention } from 'src/app/models/Dimention';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { ManegementSystem } from 'src/app/models/ManegementSystem';
import { TypeOfCompany } from 'src/app/models/TypeOfCompany';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.css']
})
export class CompaniesTableComponent implements OnInit {

  isLoading: boolean

  companies!: ICompany[];

  filteredCompanies!: ICompany[] | null;

  dataSource!: ICompany[];

  clickedRows = new Set<ICompany>();

  filteringName = "";

  filteringCity = "";

  filteringProvince = "";

  filteringActivity = "";

  selManSystem!: ManegementSystem;

  selRvnDimention!: Dimention;

  displayedColumns: string[] = [];

  typesOfCompanies: string[] = Object.keys(TypeOfCompany)
    .filter((item) => { return isNaN(Number(item)); })
    .concat("TUTTE");

  managementSystems: string[] = Object.keys(ManegementSystem).filter((item) => {
    return isNaN(Number(item));
  });

  revenueDimentions: string[] = Object.keys(Dimention).filter((item) => {
    return isNaN(Number(item));
  });

  employesDimentions: string[] = Object.keys(Dimention).filter((item) => {
    return isNaN(Number(item));
  });

  constructor(private _service: CompaniesService,
    private _router: Router) {
    this.isLoading = true
  }


  filter() {
    this.dataSource = this.companies.filter(
      c => c.nomeAttivita.toLocaleLowerCase().includes(this.filteringName.toLocaleLowerCase())
        && c.citta.toLocaleLowerCase().includes(this.filteringCity.toLocaleLowerCase())
        && c.tipoAttivita.toLocaleLowerCase().includes(this.filteringActivity.toLocaleLowerCase())
        && c.provincia.toLocaleLowerCase().includes(this.filteringProvince.toLocaleLowerCase())
    )
  }

  deleteNameFilter() {
    this.filteringName = "";
    this.filter();
  }

  deleteCityFilter() {
    this.filteringCity = "";
    this.filter();
  }

  deleteActivityFilter() {
    this.filteringActivity = "";
    this.filter();
  }

  deleteProvinceFilter() {
    this.filteringProvince = "";
    this.filter();
  }

  goToDatas(selectedCompany: ICompany) {
    this._router.navigate(["aziende/" + selectedCompany.nomeAttivita]);
  }

  ngOnInit(): void {
    this._service.AllCompanies("Company")
      .subscribe((cmp: ICompany[]) => {
        this.initICompanyFields(cmp)
        this.companies = cmp;
        this.dataSource = this.companies;
        this.displayedColumns = Object.keys(this.dataSource[0]).slice(1, this.displayedColumns.length - 1);
        this.isLoading = false // for loading-spinner
      });
  }

  private initICompanyFields(companies: ICompany[]) {
    companies.forEach(c => {
      if (c.nomeAttivita === null)
        c.nomeAttivita = ''
      if (c.tipoAttivita === null)
        c.tipoAttivita = ''
      if (c.citta === null)
        c.citta = ''
      if (c.provincia === null)
        c.provincia = ''
    })
  }

}
