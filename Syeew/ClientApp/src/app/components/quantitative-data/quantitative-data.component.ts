import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { QuantitativeData } from 'src/app/models/QuantitativeData';
import { QuantitativeDataService } from 'src/app/services/quantitative-data.service';

@Component({
  selector: 'app-quantitative-data',
  templateUrl: './quantitative-data.component.html',
  styleUrls: ['./quantitative-data.component.css']
})
export class QuantitativeDataComponent implements OnInit, AfterViewInit {

  quantitativeData: IQuantitativeData[] = [];

  displayedColumns: string[] = [];

  public dataSource = new MatTableDataSource<IQuantitativeData>(this.quantitativeData);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private _service: QuantitativeDataService){}

  ngOnInit(): void {
    this._service.AllQuantitativeData("QuantitativeData")
                  .subscribe((data: IQuantitativeData[]) => this.quantitativeData = data);
    console.log(this.quantitativeData.length);
    this.displayedColumns = ['IdQuantitativeData'].concat(Object.keys(this.quantitativeData[0]));
    //console.log(this.quantitativeData[0].Cat1);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}


// {
//   const raw = of(data);
//   const mapsss = map((dts: IQuantitativeData[]) =>
//     dts.forEach(dt =>
//     dt = {
//       IdQuantitativeData: (dt as QuantitativeData).IdQuantitativeData,
//       MatriceNome: (dt as QuantitativeData).MatriceNome,
//       IdMatrice: (dt as QuantitativeData).IdMatrice,
//       TypeOfCompany: (dt as QuantitativeData).TypeOfCompany,
//       IdCat: (dt as QuantitativeData).IdCat,
//       Cat1: (dt as QuantitativeData).Cat1,
//       Idx: (dt as QuantitativeData).Idx,
//       Dt: (dt as QuantitativeData).Dt,
//       Netto: (dt as QuantitativeData).Netto,
//       Iva: (dt as QuantitativeData).Iva,
//       FattIvato: (dt as QuantitativeData).FattIvato,
//       Qta: (dt as QuantitativeData).Qta,
//       Lavorato: (dt as QuantitativeData).Lavorato,
//       Dim: (dt as QuantitativeData).Dim
//     })
//   );
//   const casted = mapsss(raw);
//   casted.subscribe(c => console.log("prova -->" + c));
