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

  filteredCompanies!: ICompany[];

  displayedColumns: string[] = [];

  clickedRows = new Set<ICompany>();

  filteringName = "";

  filteringCity = "";

  constructor(private _service: CompaniesService,
              private _router: Router)
  {}

  // filterByName(){
  //   if (this.filteredCompanies == null)
  //     this.filteredCompanies = Array.from(this.companies);
  //   this.dataSource = this.filteredCompanies.filter(c =>
  //     c.companyName.toLocaleLowerCase().includes(this.filteringName.toLocaleLowerCase()));

  // }

  filter(){
    if (this.filteredCompanies == null)
      this.filteredCompanies = Array.from(this.companies);
    this.dataSource = this.filteredCompanies.filter(c => c.companyName.toLocaleLowerCase()
                                                          .includes(this.filteringName.toLocaleLowerCase()))
                                            .filter(c => c.city.toLocaleLowerCase()
                                                          .includes(this.filteringCity.toLocaleLowerCase()));
  }


  deleteNameFilter(){
    this.filteringName = "";
    this.filter();
    // this.dataSource = this.filteredCompanies.filter(c =>
    //   c.companyName.toLocaleLowerCase().includes(c.companyName.substring(0,1)));
    //this.dataSource = Array.from(this.companies);
  }

  deleteCityFilter(){
    this.filteringCity = "";
    this.filter();
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
