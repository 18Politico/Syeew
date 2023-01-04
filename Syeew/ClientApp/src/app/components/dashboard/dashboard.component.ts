import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoxPlotComponent } from '../charts/box-plot/box-plot.component';
import { Observable } from 'rxjs';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild('xAxis') xAxisChoises!: any
  xAxisChoice!: string;
  selectedColor: ThemePalette = 'primary'
  choises: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  cards!: Observable<any>

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Card 1', cols: 1, rows: 1 },
            { title: 'Card 2', cols: 1, rows: 1 },
            { title: 'Card 3', cols: 1, rows: 1 },
            { title: 'Card 4', cols: 1, rows: 1 },
          ];
        }

        return [
          { nameChart: 'Box Plot', cols: 1, rows: 1 },
          { nameChart: 'Bar Chart', cols: 1, rows: 1 },
          { nameChart: 'Line Chart', cols: 1, rows: 1 },
          { nameChart: 'Column Chart', cols: 1, rows: 1 },
          { nameChart: 'Pie Chart', cols: 1, rows: 1 },
          { nameChart: '', cols: 1, rows: 1 },
        ];
      })
    );
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
      case 'Pie Chart': {
        dialogRef = this.dialog.open(BarChartComponent);
        break;
      }
      case 'Line Chart': {
        dialogRef = this.dialog.open(LineChartComponent);
        break;
      }
    }
    dialogRef!.updateSize('300vw')
  }
}