import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoxPlotComponent } from '../charts/box-plot/box-plot.component';
import { Observable } from 'rxjs';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { ScatterPlotComponent } from '../charts/scatter-plot/scatter-plot.component';
import { ColumnChartComponent } from '../charts/column-chart/column-chart.component';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @ViewChild('xAxis') xAxisChoises!: any
  xAxisChoice!: string;
  selectedColor: ThemePalette = 'primary'
  choises: string[] = ['Line Chart', 'Bar Chart', 'Summer', 'Autumn'];
  cards!: Observable<any>
  @Input() selectedCompany!: ICompany
  @Input() dateFrom!: string
  @Input() dateTo?: string
  dateFromProva = new Date(this.dateFrom)
  @Input() filtered!: IQuantitativeData[]

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        /*if (matches) {
          return [
            { title: 'Card 1', cols: 1, rows: 1 },
            { title: 'Card 2', cols: 1, rows: 1 },
            { title: 'Card 3', cols: 1, rows: 1 },
            { title: 'Card 4', cols: 1, rows: 1 },
            { title: 'Card 5', cols: 1, rows: 1 },
            { title: 'Card 6', cols: 1, rows: 1 },
          ];
        }*/

        return [
          { nameChart: 'Box Plot', cols: 1, rows: 1 },
          { nameChart: 'Box Plot Netto', cols: 1, rows: 1 },  // prova col netto
          { nameChart: 'Bar Chart', cols: 1, rows: 1 },
          { nameChart: 'Line Chart', cols: 1, rows: 1 },
          { nameChart: 'Column Chart', cols: 1, rows: 1 },
          { nameChart: 'Pie Chart', cols: 1, rows: 1 },
          { nameChart: 'Scatter Plot', cols: 1, rows: 1 },
        ];
      })
    );
  }

  ngOnInit(): void {
  }

  openChart(chartName: string) {
    let dialogRef: MatDialogRef<any, any>
    switch (chartName) {
      case 'Box Plot': {
        dialogRef = this.dialog.open(BoxPlotComponent);
        break;
      }
      case 'Bar Chart': {
        dialogRef = this.dialog.open(BarChartComponent);
        break;
      }
      case 'Line Chart': {
        dialogRef = this.dialog.open(LineChartComponent);
        break;
      }
      case 'Column Chart': {
        dialogRef = this.dialog.open(ColumnChartComponent);
        break;
      }
      case 'Pie Chart': {
        dialogRef = this.dialog.open(PieChartComponent);
        break;
      }
      case 'Box Plot Netto': {
        dialogRef = this.dialog.open(BoxPlotComponent);
        break;
      }
      case 'Scatter Plot': {
        dialogRef = this.dialog.open(ScatterPlotComponent);
        break;
      }
    }
    dialogRef!.updateSize('300vw')
  }
}
