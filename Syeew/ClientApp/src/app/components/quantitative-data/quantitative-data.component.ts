import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { CompaniesService } from 'src/app/services/companies.service';
import { QuantitativeDataService } from 'src/app/services/quantitative-data.service';

@Component({
  selector: 'app-quantitative-data',
  templateUrl: './quantitative-data.component.html',
  styleUrls: ['./quantitative-data.component.css']
})
export class QuantitativeDataComponent implements OnInit {

  isLoading: boolean

  vediDash: boolean = false;

  filtered: IQuantitativeData[] = [];

  clickedCompany!: ICompany;

  quantitativeData!: IQuantitativeData[];

  displayedColumns: string[] = [];

  dataSource!: MatTableDataSource<IQuantitativeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _serviceData: QuantitativeDataService,
    private _serviceCmp: CompaniesService,
    private _route: ActivatedRoute) {
    this.isLoading = true
  }

  dateFrom = new FormControl('', [Validators.required]);

  dateUntil = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    var companyName = this._route.snapshot.paramMap.get('companyName');
    this._serviceData.DatasOf(companyName!)
      .subscribe((data: IQuantitativeData[]) => {
        this.quantitativeData = data;
        if (this.quantitativeData[0] != null) {
          this.displayedColumns = Object.keys(this.quantitativeData[0])
            .slice(1, this.displayedColumns.length - 2);
          this.dataSource = new MatTableDataSource<IQuantitativeData>(this.quantitativeData);
          setTimeout(() => this.dataSource!.paginator = this.paginator); // set timeout for loading with spinner
        }
        this.isLoading = false // for stopping loading-spinner
      });
    this._serviceCmp.CompanyBy(companyName!).subscribe((c) => {
      this.clickedCompany = c
    });
  }

  onDateSet() {
    //var filtered: IQuantitativeData[] = [];
    if (this.filtered.length != 0)
      this.filtered = [];
    this.quantitativeData.forEach(qD => {
      this.dateCheck(qD)
    });
    //console.log("ECCO -->" + this.dateUntil.value + "_")
    this.dataSource = new MatTableDataSource<IQuantitativeData>(this.filtered);
    this.dataSource.paginator = this.paginator;
  }

  private dateCheck(data: IQuantitativeData) {
    if (this.dateFrom.valid
      && !this.dateUntil.valid)
      this.dateFromCase(data);
    if (this.dateUntil.valid
      && !this.dateFrom.valid)
      this.dateUntilCase(data);
    if (this.dateUntil.valid
      && this.dateFrom.valid)
      this.bothDatesCase(data);
    return;
  }

  private dateFromCase(data: IQuantitativeData) {
    var dateFrom = new Date(this.dateFrom.value!)
    var dataDate = new Date(data.dt);
    //console.log("DATEFROM -> "+ dataDate.getTime())
    if (dateFrom.getTime() < dataDate.getTime()) {
      this.filtered.push(data)
      //console.log("from CIao")
      //console.log(dateFrom)
    }

  }

  private dateUntilCase(data: IQuantitativeData) {
    var dateUntil = new Date(this.dateUntil.value!)
    var dataDate = new Date(data.dt);
    if (dataDate.getTime() <= dateUntil.getTime())
      this.filtered.push(data)

    console.log("until CIao")
    console.log(dateUntil)
  }

  private bothDatesCase(data: IQuantitativeData) {
    var dateFrom = new Date(this.dateFrom.value!)
    var dateUntil = new Date(this.dateUntil.value!)
    var dataDate = new Date(data.dt);
    if (dateFrom.getTime() <= dataDate.getTime()
      && dataDate.getTime() <= dateUntil.getTime())
      this.filtered.push(data)

    //console.log("both CIao")
  }

  private sameDate(formDate: string | null, date: Date): boolean {
    var dt = date.toString();
    if (formDate?.substring(0, 4) == dt.substring(0, 4)
      && formDate.substring(5, 7) == dt.substring(5, 7)
      && formDate.substring(8, 10) == dt.substring(8, 10))
      return true;
    return false;
  }

  VediDashFunc() {
    this.vediDash = true;
    setTimeout(() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" }));
  }

  resetDashboard() {
    this.vediDash = false
    this.filtered = []
    this.dateFrom = new FormControl('', [Validators.required]);
    this.dateUntil = new FormControl('', [Validators.required]);

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
