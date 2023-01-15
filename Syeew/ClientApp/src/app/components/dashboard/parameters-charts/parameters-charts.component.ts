import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { QuantitativeData } from 'src/app/models/QuantitativeData';
import { ScatterPlotComponent } from '../../charts/scatter-plot/scatter-plot.component';

@Component({
  selector: 'app-parameters-charts',
  templateUrl: './parameters-charts.component.html',
  styleUrls: ['./parameters-charts.component.css']
})
export class ParametersChartsComponent {

  cards!: Observable<any>

  selectedColor: ThemePalette = 'primary'

  buttonsX: Map<string, boolean>

  buttonsY: Map<string, boolean>

  xAxisChoice = ""
  yAxisChoice = ""

  plotCanBeBuilt= false;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        return [
          { nameChart: 'Scatter Plot', cols: 1, rows: 1 },
        ];
      })
    );

    this.buttonsX = new Map<string, boolean>([
      ["Netto", false],
      ["Iva", false],
      ["FatturatoIvato", false],
      ["Quantità", false],
      ["Dimensione", false],
    ]);

    this.buttonsY = new Map<string, boolean>([
      ["Netto", false],
      ["Iva", false],
      ["FatturatoIvato", false],
      ["Quantità", false],
      ["Dimensione", false],
    ]);


  }

  openChart(chartName: string) {
    let dialogRef: MatDialogRef<any, any>
    switch (chartName) {
      case 'Scatter Plot': {
        dialogRef = this.dialog.open(ScatterPlotComponent);
        break;
      }
    }
    dialogRef!.updateSize('300vw')
  }

  VerifyActiveButtons(){
    this.UpdateButtonsX()
    this.UpdateButtonsY()
    this.TryToGenerateScatter()
  }

  private UpdateButtonsY(){
      for (const key of this.buttonsY.keys()) {
        if (this.xAxisChoice !== key)
          this.buttonsY.set(key, false)
        else
          this.buttonsY.set(key, true)

    }
  }

  private UpdateButtonsX(){
      for (const key of this.buttonsX.keys()) {
        if (this.yAxisChoice !== key)
          this.buttonsX.set(key, false)
        else
          this.buttonsX.set(key, true)
      }
  }

  private TryToGenerateScatter(){
    if (this.xAxisChoice !== "" && this.yAxisChoice !== "")
      this.plotCanBeBuilt = true
  }


  GenerateScatterPlot(){
    this.plotCanBeBuilt = true;
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
