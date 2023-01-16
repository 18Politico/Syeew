import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { ScatterPlotComponent } from '../../charts/scatter-plot/scatter-plot.component';

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
  @Input() xAxisChoice?: string
  @Input() yAxisChoice?: string
  cards: any[]
  plotCanBeBuilt = false; // take in input from axis-selection component

  constructor(private dialog: MatDialog) {
    this.cards = [
      { nameChart: 'scatterplot', cols: 1, rows: 1 },
    ]
  }

  openChart(chartName: string) {
    let dialogRef: MatDialogRef<any, any>
    switch (chartName) {
      case 'scatterplot': {
        dialogRef = this.dialog.open(ScatterPlotComponent);
        break;
      }
    }
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
