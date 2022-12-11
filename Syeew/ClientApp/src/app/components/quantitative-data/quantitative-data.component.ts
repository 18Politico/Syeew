import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  filteringName = '*NOME ATTIVITÀ*';

  dataSource!: MatTableDataSource<IQuantitativeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private _service: QuantitativeDataService){}

  ngOnInit(): void {
    this._service.AllQuantitativeData("QuantitativeData")
                  .subscribe((data: IQuantitativeData[]) => {
                    this.quantitativeData = data;
                    this.displayedColumns = Object.keys(this.quantitativeData[0]);
                    this.dataSource = new MatTableDataSource<IQuantitativeData>(this.quantitativeData);
                    this.dataSource.paginator = this.paginator;
                    console.log(this.displayedColumns[0]);
                  });
  }

  filterByName(){
      var filteredActivities = Array.from(this.quantitativeData);
      this.dataSource = new MatTableDataSource<IQuantitativeData>
                          (filteredActivities.filter(dt =>
                            dt.company.companyName.toLocaleLowerCase().includes(this.filteringName.toLocaleLowerCase()))
                          );
      this.dataSource.paginator = this.paginator;

  }

  private resetTable(){
    this.dataSource = new MatTableDataSource<IQuantitativeData>(this.quantitativeData);
    this.dataSource.paginator = this.paginator;
  }

  deleteNameFilter(){
    this.filteringName = '';
    this.resetTable();
  }

  prova(){
    console.log(this.displayedColumns[0]);
  }

}
