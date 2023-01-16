import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-fixed-parameters-charts',
  templateUrl: './fixed-parameters-charts.component.html',
  styleUrls: ['./fixed-parameters-charts.component.css']
})
export class FixedParametersChartsComponent {

  cards: Observable<any>

  selectedColor: ThemePalette = 'primary'

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog){
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        return [
          { nameChart: 'Scatter Plot', cols: 1, rows: 1 },
        ];
      })
    );
  }

  openChart(chartName: string) {
    let dialogRef: MatDialogRef<any, any>
    switch (chartName) {
      case 'Pie Chart': {
        dialogRef = this.dialog.open(PieChartComponent);
        break;
      }
    }
    dialogRef!.updateSize('300vw')
  }

}
