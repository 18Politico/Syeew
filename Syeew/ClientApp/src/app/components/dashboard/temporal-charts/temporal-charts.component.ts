import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { ChartData, ZoomChartComponent } from '../zoom-chart/zoom-chart.component';

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
  @Input() yAxisChoice!: string
  @Input() yAxisTitle!: string
  cards: any[]
  plotCanBeBuilt = false; // take in input from axis-selection component

  constructor(private dialog: MatDialog) {
    this.cards = [
      { nameChart: 'boxplotDay', cols: 1, rows: 1 },
      { nameChart: 'boxplotMonth', cols: 1, rows: 1 },
      { nameChart: 'bar', cols: 1, rows: 1 },
      { nameChart: 'line', cols: 1, rows: 1 },
    ]
  }

  ngOnInit(): void {

  }

  /**
   * Checks if plot can be built taking permission from axis-selection component. If it can be
   * built, axis-selection component sends to this component a json data.
   * @param evtData json data that contains the boolean permission building and the plotting axis choises
   */
  checkIfBuilding(evtData: { plotting: boolean, xAxis: string, yAxis: string, yAxisTitle: string }) {
    this.plotCanBeBuilt = evtData.plotting
    this.yAxisChoice = evtData.yAxis
    this.yAxisTitle = evtData.yAxisTitle
  }

  openChart(nameChart: string) {
    let dialogRef = this.dialog.open(ZoomChartComponent, {
      data: {
        nameChart: nameChart, selectedCompany: this.selectedCompany, filteredQuantitativeData: this.filteredQuantitativeData,
        dateFrom: this.dateFrom, dateTo: this.dateTo, yAxisChoice: this.yAxisChoice, yAxisTitle: this.yAxisTitle
      }
    })
    dialogRef!.updateSize('300vw')
  }

}