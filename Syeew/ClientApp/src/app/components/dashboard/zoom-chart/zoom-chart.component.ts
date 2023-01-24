import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICompany } from 'src/app/models/interfaces/ICompany';

export interface ChartData {
  nameChart: string;
  selectedCompany: ICompany;
  dateFrom: string;
  dateTo: string;
  yAxisChoice: string;
  yAxisTitle: string;
  xAxisChoice?: string
}

@Component({
  selector: 'app-zoom-chart',
  templateUrl: './zoom-chart.component.html',
  styleUrls: ['./zoom-chart.component.css']
})
export class ZoomChartComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ChartData) { }

  ngOnInit(): void {

  }

}
