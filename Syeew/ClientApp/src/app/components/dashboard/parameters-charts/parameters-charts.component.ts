import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class ParametersChartsComponent implements OnInit{

  cards!: Observable<any>

  selectedColor: ThemePalette = 'primary'
  choises!: string[]

  xAxisChoice!: string;
  yAxisChoice!: string;
  refreshIsDisabled!: boolean;

  // disabledRadioButtonX!: boolean;
  // disabledRadioButtonY!: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        return [
          { nameChart: 'Scatter Plot', cols: 1, rows: 1 },
        ];
      })
    );
    this.xAxisChoice = ""
    this.yAxisChoice = ""
    this.choises = Object.keys(new QuantitativeData())
    this.refreshIsDisabled = true
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.xAxisChoice === "" || this.yAxisChoice === "")
        this.refreshIsDisabled = true;
    else if (this.xAxisChoice === this.yAxisChoice)
      this.refreshIsDisabled = true;
    else
      this.refreshIsDisabled = false;
  }

  VerifyRefresh(){


    if (this.xAxisChoice === "" || this.yAxisChoice === "")
        this.refreshIsDisabled = true;
    else if (this.xAxisChoice === this.yAxisChoice)
      this.refreshIsDisabled = true;
    else
      this.refreshIsDisabled = false;

    console.log("x = " + this.xAxisChoice)
    console.log("y = " + this.yAxisChoice)
    console.log("dis = " + this.refreshIsDisabled)
  }

  RefreshScatterPlot(){}

  ngOnInit(): void {
    // this.choises = Object.keys(new QuantitativeData())

    // this.refreshIsDisabled = true

    // this.disabledRadioButtonX = true
    // this.disabledRadioButtonY = true
  }



}
