import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-axis-selection',
  templateUrl: './axis-selection.component.html',
  styleUrls: ['./axis-selection.component.css']
})
export class AxisSelectionComponent {

  buttonsX: Map<string, boolean>
  buttonsY: Map<string, boolean>
  xAxisChoice = ""
  yAxisChoice = ""
  selectedColor: ThemePalette = 'primary'
  @Input() isXAxisEnabled!: boolean
  @Input() isYAxisEnabled!: boolean
  @Output() plotBuilding = new EventEmitter<{ plotting: boolean, xAxis: string, yAxis: string }>() // from axis-selection to parameters-chart, temporal-charts...
  plotCanBeBuilt = false;

  constructor() {
    this.buttonsX = new Map<string, boolean>([
      ["Netto", false],
      ["Iva", false],
      ["FatturatoIvato", false],
      ["Quantità", false],
      ["N. Dipendenti", false],
    ]);
    this.buttonsY = new Map(this.buttonsX)
  }

  verifyActiveButtons() {
    if (this.isXAxisEnabled)
      this.updateButtonsX()
    this.updateButtonsY()
    this.tryToGenerateScatter()
  }

  private updateButtonsY() {
    for (const key of this.buttonsY.keys())
      if (this.xAxisChoice !== key)
        this.buttonsY.set(key, false)
      else
        this.buttonsY.set(key, true)
  }

  private updateButtonsX() {
    for (const key of this.buttonsX.keys())
      if (this.yAxisChoice !== key)
        this.buttonsX.set(key, false)
      else
        this.buttonsX.set(key, true)
  }

  private tryToGenerateScatter() {
    if ((!this.isXAxisEnabled && this.yAxisChoice !== "") || (this.xAxisChoice !== "" && this.yAxisChoice !== ""))
      this.plotCanBeBuilt = true
    this.plotBuilding.emit({ plotting: this.plotCanBeBuilt, xAxis: this.xAxisChoice, yAxis: this.yAxisChoice })
  }

}
