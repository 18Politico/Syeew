import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { QuantitativeDataService } from 'src/app/services/quantitative-data.service';

@Component({
  selector: 'app-quantitative-data',
  templateUrl: './quantitative-data.component.html',
  styleUrls: ['./quantitative-data.component.css']
})
export class QuantitativeDataComponent implements OnInit {


  quantitativeData!: IQuantitativeData[];

  displayedColumns: string[] = [];

  dataSource!: MatTableDataSource<IQuantitativeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _service: QuantitativeDataService,
              private _route: ActivatedRoute)
  {}

  dateFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    var companyName = this._route.snapshot.paramMap.get('companyName');
    this._service.DatasOf(companyName!)
                  .subscribe((data: IQuantitativeData[]) => {
                    this.quantitativeData = data;
                    this.displayedColumns = Object.keys(this.quantitativeData[0])
                                                  .slice(1, this.displayedColumns.length-2);
                    this.dataSource = new MatTableDataSource<IQuantitativeData>(this.quantitativeData);
                    this.dataSource.paginator = this.paginator;
                  });
  }

  filterByDate(){
    var filtered: IQuantitativeData[] = [];
    this.quantitativeData.forEach(qD => {
      if (this.sameDate(this.dateFormControl.value, qD.date))
        filtered.push(qD);
    });
    this.dataSource = new MatTableDataSource<IQuantitativeData>(filtered);
    this.dataSource.paginator = this.paginator;
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
