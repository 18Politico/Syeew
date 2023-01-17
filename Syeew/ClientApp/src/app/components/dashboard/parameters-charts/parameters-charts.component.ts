import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { ZoomChartComponent } from '../zoom-chart/zoom-chart.component';

@Component({
  selector: 'app-parameters-charts',
  templateUrl: './parameters-charts.component.html',
  styleUrls: ['./parameters-charts.component.css']
})
export class ParametersChartsComponent {

  @Input() selectedCompany!: ICompany
  @Input() dateFrom!: string
  @Input() dateTo!: string
  @Input() filteredQuantitativeData!: IQuantitativeData[]
  @Input() xAxisChoice!: string
  @Input() yAxisChoice!: string
  cards: any[]
  plotCanBeBuilt = false; // take in input from axis-selection component

  constructor(private dialog: MatDialog) {
    this.cards = [
      { nameChart: 'scatterplot', cols: 1, rows: 1 },
    ]
  }

  openChart(nameChart: string) {
    let dialogRef = this.dialog.open(ZoomChartComponent, {
      data: {
        nameChart: nameChart, selectedCompany: this.selectedCompany, filteredQuantitativeData: this.filteredQuantitativeData,
        dateFrom: this.dateFrom, dateTo: this.dateTo, xAxisChoice: this.xAxisChoice, yAxisChoice: this.yAxisChoice
      }
    })
    dialogRef!.updateSize('300vw')
  }

  /**
   * Checks if plot can be built taking permission from axis-selection component. If it can be
   * built, axis-selection component sends to this component a json data.
   * @param evtData json data that contains the boolean permission building and the plotting axis choises
   */
  checkIfBuilding(evtData: { plotting: boolean, xAxis: string, yAxis: string }) {
    this.plotCanBeBuilt = evtData.plotting
    this.xAxisChoice = evtData.xAxis
    this.yAxisChoice = evtData.yAxis
  }

}

 // VerifyRefresh(){
  //   if (this.xAxisChoice === "" || this.yAxisChoice === "")
  //       this.refreshIsDisabled = true;
  //   else if (this.xAxisChoice === this.yAxisChoice)
  //     this.refreshIsDisabled = true;
  //   else
  //     this.refreshIsDisabled = false;
  // }
