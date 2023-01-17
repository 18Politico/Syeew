import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Dimention } from 'src/app/models/Dimention';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
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

  //@ViewChild('refTypeOfCmp') refCmp!: ElementRef;

  //selTypeOfCmp!: string | undefined;

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

  // filterByName(){
  //   if (this.filteredCompanies == null)
  //     this.filteredCompanies = Array.from(this.companies);
  //   this.dataSource = this.filteredCompanies.filter(c =>
  //     c.companyName.toLocaleLowerCase().includes(this.filteringName.toLocaleLowerCase()));

  // }

  filter(){
    this.filteredCompanies = null
    console.log("dim tutte = " + this.companies.length)
    if (this.filteringName === "" && this.filteringCity !== "")
      this.filterByCity()
    else if (this.filteringName !== "" && this.filteringCity === "")
      this.filterByName()
     else
    //  {
    //   this.filterByName()
    //   this.filterByCity()
    // }

    this.filterByNameAndCity()
  }

  private filterByName(){
    if (this.filteredCompanies == null)
      this.filteredCompanies = Array.from(this.companies);
    if (this.selTypeOfCmp === undefined
      || this.selTypeOfCmp.toString() === "TUTTE") {
      this.filterWithoutDropDowns();
    } else {
      this.filterWithDropDowns();
    }
    console.log(this.selTypeOfCmp)
  }

  private filterWithDropDowns() {
    this.dataSource = this.companies.filter(c => c.nomeAttivita.toLocaleLowerCase()
      .includes(this.filteringName.toLocaleLowerCase()))
      .filter(c => c.citta.toLocaleLowerCase()
        .includes(this.filteringCity.toLocaleLowerCase()))
      .filter(c => c.tipoAttivita === this.selTypeOfCmp);
  }

  private filterWithoutDropDowns() {
    this.dataSource = this.companies.filter(c => c.nomeAttivita.toLocaleLowerCase()
      .includes(this.filteringName.toLocaleLowerCase()))
      .filter(c => c.citta.toLocaleLowerCase()
        .includes(this.filteringCity.toLocaleLowerCase()))
  }

  // filter_OLD() {
  //   if (this.filteredCompanies == null)
  //     this.filteredCompanies = Array.from(this.companies);
  //   if (this.selTypeOfCmp === undefined
  //     || this.selTypeOfCmp.toString() === "TUTTE") {
  //     this.filterWithoutDropDowns();
  //   } else {
  //     this.filterWithDropDowns();
  //   }
  //   console.log(this.selTypeOfCmp)
  // }

  // private filterWithDropDowns() {
  //   this.dataSource = this.companies.filter(c => c.nomeAttivita.toLocaleLowerCase()
  //     .includes(this.filteringName.toLocaleLowerCase()))
  //     .filter(c => c.citta.toLocaleLowerCase()
  //     .includes(this.filteringCity.toLocaleLowerCase()))
  //     .filter(c => c.tipoAttivita === this.selTypeOfCmp);
  // }

  // private filterWithoutDropDowns() {
  //   this.dataSource = this.companies.filter(c => c.nomeAttivita.toLocaleLowerCase()
  //     .includes(this.filteringName.toLocaleLowerCase()))
  //     .filter(c => c.citta.toLocaleLowerCase()
  //     .includes(this.filteringCity.toLocaleLowerCase()))
  // }


  deleteNameFilter() {
    this.filteringName = "";
    this.filteredCompanies = null;
    this.filter();
  }

  deleteCityFilter() {
    this.filteringCity = "";
    this.filteredCompanies = null
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
        this.companies = cmp;
        this.dataSource = this.companies;
        this.displayedColumns = Object.keys(this.dataSource[0]).slice(1, this.displayedColumns.length - 1);
        //setTimeout(() => this.dataSource.paginator = this.paginator); // set timeout for loading with spinner
        this.isLoading = false // for loading-spinner
      });
  }


}
