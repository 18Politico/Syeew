import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoxPlotComponent } from '../../charts/box-plot/box-plot.component';
import { BarChartComponent } from '../../charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '../../charts/line-chart/line-chart.component';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart.component';
import { ScatterPlotComponent } from '../../charts/scatter-plot/scatter-plot.component';
import { ColumnChartComponent } from '../../charts/column-chart/column-chart.component';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';

@Component({
  selector: 'app-temporal-charts',
  templateUrl: './temporal-charts.component.html',
  styleUrls: ['./temporal-charts.component.css']
})
export class TemporalChartsComponent implements OnInit {

  @Input() selectedCompany!: ICompany
  @Input() dateFrom!: string
  @Input() dateTo!: string
  @Input() filteredQuantitativeData!: IQuantitativeData[]
  @Input() yAxisChoice?: string
  cards: any[]
  plotCanBeBuilt = false; // take in input from axis-selection component

  constructor(private dialog: MatDialog) {
    this.cards = [
      { nameChart: 'boxplot', cols: 1, rows: 1 },
      { nameChart: 'barchart', cols: 1, rows: 1 },
      { nameChart: 'linechart', cols: 1, rows: 1 },
    ]
  }

  ngOnInit(): void {

  }

  /**
   * Checks if plot can be built taking permission from axis-selection component. If it can be
   * built, axis-selection component sends to this component a json data.
   * @param evtData json data that contains the boolean permission building and the plotting axis choises
   */
  checkIfBuilding(evtData: { plotting: boolean, xAxis: string, yAxis: string }) {
    this.plotCanBeBuilt = evtData.plotting
    this.yAxisChoice = evtData.yAxis
  }

  openChart(chartName: string) {
    let dialogRef: MatDialogRef<any, any>
    switch (chartName) {
      case 'boxplot': {
        dialogRef = this.dialog.open(BoxPlotComponent);
        break;
      }
      case 'barchart': {
        dialogRef = this.dialog.open(BarChartComponent);
        break;
      }
      case 'linechart': {
        dialogRef = this.dialog.open(LineChartComponent);
        break;
      }
    }
    dialogRef!.updateSize('300vw')
  }

}
