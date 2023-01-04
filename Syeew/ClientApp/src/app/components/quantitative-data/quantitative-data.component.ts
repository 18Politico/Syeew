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

  filtered: IQuantitativeData[] = [];

  clickedCompany!: ICompany;

  quantitativeData!: IQuantitativeData[];

  displayedColumns: string[] = [];

  dataSource!: MatTableDataSource<IQuantitativeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _serviceData: QuantitativeDataService,
              private _serviceCmp: CompaniesService,
              private _route: ActivatedRoute)
  {}

  dateFrom = new FormControl('', [Validators.required]);

  dateUntil = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    var companyName = this._route.snapshot.paramMap.get('companyName');
    this._serviceData.DatasOf(companyName!)
                  .subscribe((data: IQuantitativeData[]) => {
                    this.quantitativeData = data;
                    this.displayedColumns = Object.keys(this.quantitativeData[0])
                                                  .slice(1, this.displayedColumns.length-2);
                    this.dataSource = new MatTableDataSource<IQuantitativeData>(this.quantitativeData);
                    this.dataSource.paginator = this.paginator;
                  });
    this._serviceCmp.CompanyBy(companyName!).subscribe(c => this.clickedCompany = c);
  }

  onDateSet(){
    //var filtered: IQuantitativeData[] = [];
    this.quantitativeData.forEach(qD => {
      this.dateCheck(qD, this.filtered)
    });
    console.log("ECCO -->" + this.dateUntil.value + "_")
    this.dataSource = new MatTableDataSource<IQuantitativeData>(this.filtered);
    this.dataSource.paginator = this.paginator;
  }

  private dateCheck(data: IQuantitativeData, filtered: IQuantitativeData[]){
    if (this.dateFrom.valid
        && !this.dateUntil.valid)
      this.dateFromCase(data, filtered);
    if (this.dateUntil.valid
        && !this.dateFrom.valid)
      this.dateUntilCase(data, filtered);
    if (this.dateUntil.valid
        && this.dateFrom.valid)
      this.bothDatesCase(data, filtered);
    return;
  }

  private dateFromCase(data: IQuantitativeData, filtered: IQuantitativeData[]) {
    var dateFrom =  new Date(this.dateFrom.value!)
    var dataDate = new Date(data.date);
    console.log("DATEFROM -> "+ dataDate.getTime())
    if (dateFrom.getTime() < dataDate.getTime()){
      filtered.push(data)
      console.log("from CIao")
    console.log(dateFrom)
    }

  }

  private dateUntilCase(data: IQuantitativeData, filtered: IQuantitativeData[]) {
    var dateUntil = new Date(this.dateUntil.value!)
    var dataDate = new Date(data.date);
    if (dataDate.getTime() <= dateUntil.getTime())
      filtered.push(data)

    console.log("until CIao")
    console.log(dateUntil)
  }

  private bothDatesCase(data: IQuantitativeData, filtered: IQuantitativeData[]) {
    var dateFrom =  new Date(this.dateFrom.value!)
    var dateUntil = new Date(this.dateUntil.value!)
    var dataDate = new Date(data.date);
    if (dateFrom.getTime() <= dataDate.getTime()
        && dataDate.getTime() <= dateUntil.getTime())
      filtered.push(data)

    console.log("both CIao")
  }

  private sameDate(formDate: string | null, date: Date): boolean{
    var dt = date.toString();
    if (formDate?.substring(0,4) == dt.substring(0,4)
        && formDate.substring(5,7) == dt.substring(5,7)
        && formDate.substring(8,10) == dt.substring(8,10))
        return true;
    return false;
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
