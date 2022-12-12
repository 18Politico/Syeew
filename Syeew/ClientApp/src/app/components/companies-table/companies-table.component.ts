import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.css']
})
export class CompaniesTableComponent implements OnInit{

  dataSource!: ICompany[];

  companies!: ICompany[];

  displayedColumns: string[] = [];

  clickedRows = new Set<ICompany>();

  filteringName = '*CIAO*';

  constructor(private _service: CompaniesService,
              private _router: Router)
  {}

  filterByName(){
    var filteredCompanies = Array.from(this.companies);
    this.dataSource = filteredCompanies.filter(c =>
      c.companyName.toLocaleLowerCase().includes(this.filteringName.toLocaleLowerCase()));

  }

  deleteNameFilter(){
    this.filteringName = '';
    this.dataSource = Array.from(this.companies);
  }

  goToDatas(selectedCompany: ICompany){
    this._router.navigate(["aziende/" + selectedCompany.companyName]);
  }

  ngOnInit(): void {
    this._service.AllCompanies("Company")
      .subscribe((cmp: ICompany[]) => {
        this.companies = cmp;
        this.dataSource = this.companies;
        this.displayedColumns = Object.keys(this.dataSource[0]).slice(1, this.displayedColumns.length-1);
      });
  }


}
