import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-fixed-parameters-charts',
  templateUrl: './fixed-parameters-charts.component.html',
  styleUrls: ['./fixed-parameters-charts.component.css']
})
export class FixedParametersChartsComponent {

  @Input() selectedCompany!: ICompany
  @Input() dateFrom!: string
  @Input() dateTo!: string
  @Input() filteredQuantitativeData!: IQuantitativeData[]
  @Input() xAxisChoice?: string
  @Input() yAxisChoice?: string
  cards: any[]

  selectedColor: ThemePalette = 'primary'

  constructor(private dialog: MatDialog) {
    this.cards = [
      { nameChart: 'piechart', cols: 1, rows: 1 },
    ];
  }

  openChart(chartName: string) {
    let dialogRef: MatDialogRef<any, any>
    switch (chartName) {
      case 'piechart': {
        dialogRef = this.dialog.open(PieChartComponent);
        break;
      }
    }
    dialogRef!.updateSize('300vw')
  }

}
