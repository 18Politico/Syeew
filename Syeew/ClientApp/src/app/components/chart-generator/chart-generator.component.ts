import { OnChanges, Component, Input, OnInit, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ChartType,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexLegend,
  ApexDataLabels,
  ApexFill,
  ApexTheme,
  ApexMarkers,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexAnnotations,
} from "ng-apexcharts";
import { PlotsService } from 'src/app/services/plots.service';
import { BoxPlotDataDTO } from 'src/app/Utils/DTOs/BoxPlotDataDTO';
import { lastValueFrom } from 'rxjs';
import { RequestDataDTO } from 'src/app/Utils/DTOs/RequestDataDTO';
import { CustomDate } from 'src/app/Utils/CustomDate';
import { BoxPlotDataMonthDTO } from 'src/app/Utils/DTOs/BoxPlotDataMonthDTO';
import { PieDataDTO } from 'src/app/Utils/DTOs/PieDataDTO';
import { TemporalDataDTO } from 'src/app/Utils/DTOs/TemporalDataDTO';
import { ParameterDataDTO } from 'src/app/Utils/DTOs/ParameterDataDTO';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  labels: any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: Array<string>;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  theme: ApexTheme;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  annotations: ApexAnnotations;
};

@Component({
  selector: 'app-chart-generator',
  templateUrl: './chart-generator.component.html',
  styleUrls: ['./chart-generator.component.css']
})
export class ChartGeneratorComponent implements OnInit, OnChanges {

  @Input() nameChart = "select a chart";
  private _initial = false
  @Input() selectedCompanies!: ICompany[]
  @Input() dateFrom!: string
  @Input() dateTo!: string
  @Input() xAxis?: string
  @Input() yAxis!: string
  @Input() xAxisTitle?: string
  @Input() yAxisTitle!: string
  companyData!: IQuantitativeData[][]
  //@ViewChild("chart", { static: false }) chart!: ChartComponent;
  //@ViewChild("brush", { static: false }) brush!: ChartComponent;
  chartOptions!: Partial<ChartOptions>; // TODO: usarlo al posto di come ho fatto ora
  optionsBrush!: Partial<ChartOptions>; // TODO: usarlo al posto di come ho fatto ora
  //public activeOptionButton = "all"; //TODO: dopo
  @Input() showTimeButtons!: boolean // to show buttons that change a period in a chart (1 month, 6 month, 1 year)
  isBrush!: boolean


  // TODO: pensarci dopo e pensare bene ai controlli
  /*public updateOptionsData: any = {
    "1m": {
      xaxis: {
        min: new Date(this.dateFrom).getTime(),
        max: new Date(this.dateTo).getTime()
      }
    },
    "6m": {
      xaxis: {
        min: new Date(this.dateFrom).getTime(),
        max: new Date(this.dateTo).getTime()
      }
    },
    "1y": {
      xaxis: {
        min: new Date(this.dateFrom).getTime(),
        max: new Date(this.dateTo).getTime()
      }
    },
    "1yd": {
      xaxis: {
        min: new Date(this.dateFrom).getTime(),
        max: new Date(this.dateTo).getTime()
      }
    },
    all: {
      xaxis: {
        type: "datetime",
        min: undefined,
        max: undefined,
        tickAmount: 10,
        labels: {
          formatter: function (val: string) {
            return parseFloat(val).toFixed(0)
          }
        }
      }
    }
  };*/

  constructor(private plotService: PlotsService) {
    this.isBrush = false
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {}
    this.optionsBrush = {}
    this.generatePlot(this.nameChart)
  }

  ngOnInit(): void {
  }

  async generatePlot(chartName: string) {
    let companyNames: string[] = []
    this.selectedCompanies.forEach(c => { companyNames.push(c.nomeAttivita) })
    switch (chartName) {
      case 'boxplotDay': {
        let boxData: BoxPlotDataDTO[][] = []
        for (var c of this.selectedCompanies) {
          await lastValueFrom(this.plotService.getBoxPlotDataDay(new RequestDataDTO(c.nomeAttivita,
            this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data) => {
              boxData.push(data)
            })
        }
        this.createTemporalChart(this.prepareBoxPlotDayData(companyNames, boxData), "boxPlot")
        break;
      }
      case 'boxplotMonth': {
        let boxData: BoxPlotDataMonthDTO[] = []
        for (var c of this.selectedCompanies) {
          await lastValueFrom(this.plotService.getBoxPlotDataMonth(new RequestDataDTO(c.nomeAttivita,
            this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data) => {
              boxData.push(data)
            })
        }
        this.createTemporalChart(this.prepareBoxPlotMonthData(companyNames, boxData), "boxPlot")
        break;
      }
      case 'bar':
      case 'line':
      case 'brush': {
        let temporalData: TemporalDataDTO[][] = []
        for (var c of this.selectedCompanies) {
          await lastValueFrom(this.plotService.getTemporalDataDay(new RequestDataDTO(c.nomeAttivita,
            this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data) => {
              temporalData.push(data)
            })
        }
        if (chartName == 'brush') {
          this.isBrush = true
          this.createBrushChart(this.prepareLineBarChartsData(companyNames, temporalData))
        }
        else
          this.createTemporalChart(this.prepareLineBarChartsData(companyNames, temporalData), chartName)
        break;
      }
      case 'scatter': {
        let parameterData: ParameterDataDTO[][] = []
        for (var c of this.selectedCompanies) {
          await lastValueFrom(this.plotService.getParametersDataDay(new RequestDataDTO(c.nomeAttivita,
            this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis, this.xAxis))).then((data) => {
              parameterData.push(data)
            })
        }
        this.createParametersChart(this.prepareScatterPlotData(companyNames, parameterData))
        break;
      }
      case 'pie': {
        let pieData: PieDataDTO[][] = []
        for (var c of this.selectedCompanies) {
          await lastValueFrom(this.plotService.getPieDataMonth(new RequestDataDTO(c.nomeAttivita,
            this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis, this.xAxis))).then((data) => {
              pieData.push(data)
            })
        }
        let map = this.preparePieChartData(companyNames, pieData)
        let contents: any[] = []
        map.forEach(v => contents.push(v[1])) // preparazione dati singola azienda
        this.createPieChart(contents, Array.from(map.keys()))
        /*console.log('map: ', map)
        map.forEach(e => {
          this.addingCards.emit({ adding: true })
        })*/
        break;
      }
      case 'area': {
        let pieData: PieDataDTO[][] = []
        for (var c of this.selectedCompanies) {
          await lastValueFrom(this.plotService.getPieDataMonth(new RequestDataDTO(c.nomeAttivita,
            this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis, this.xAxis))).then((data) => {
              pieData.push(data)
            })
        }
        let map = this.preparePieChartData(companyNames, pieData)
        let contents: number[] = []
        map.forEach(v => contents.push(v[1])) // preparazione dati singola azienda
        this.generateAreaChart(this.prepareAreaChartData(Array.from(map.keys()), contents))
        break;
      }
    }
  }

  createBrushChart(series: any[]) {
    this.chartOptions = {
      series: series,
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        toolbar: {
          autoSelected: 'pan',
          show: false
        }
      },
      //colors: ['#546E7A'],
      stroke: {
        width: 1
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: this.yAxisTitle
        }
      }
    };

    this.optionsBrush = {
      series: series,
      chart: {
        id: 'chart1',
        height: 130,
        type: 'area',
        brush: {
          target: 'chart2',
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date(this.dateFrom).getTime(),
            max: new Date(this.dateTo).getTime()
          }
        },
      },
      //colors: ['#008FFB'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        }
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        tickAmount: 2
      }
    };
    this.initial = true
  }

  //TODO: secondo me ha senso solo per la singola azienda, altrimenti non si capisce niente
  private prepareBoxPlotDayData(companyNames: string[], boxData: BoxPlotDataDTO[][]): any[] {
    let tmp: BoxPlotDataDTO[][] = []
    let companyData: any[] = []
    let companiesData: any[] = []
    let series: any[][] = []
    boxData.forEach(b => {
      b.sort((d1, d2) => this.fromCustomDateToDate(d1.date).getTime() - this.fromCustomDateToDate(d2.date).getTime())
      tmp.push(b)
    })
    // storing each company data inside companiesData
    tmp.forEach(t => {
      t.forEach(bData => {
        companyData.push([this.fromCustomDateToDate(bData.date).getTime(), bData.stats])
      })
      companiesData.push(companyData)
      companyData = []
    })
    // create series with company name and corresponding data
    companyNames.forEach((n, i) => {
      var JSONobj = JSON.parse(JSON.stringify({ name: n, data: companiesData[i] }))
      series.push(JSONobj)
    })
    return series
  }

  private prepareBoxPlotMonthData(companyNames: string[], boxData: BoxPlotDataMonthDTO[]): any[] {
    let data: any[] = []
    let companiesData: any[] = []
    let series: any[] = []
    // storing each box month data inside companiesData
    boxData.forEach(b => {
      b.months.forEach((m, i) => data.push([m, b.stats[i]]))
      companiesData.push(data)
      data = []
    })
    // create series with company name and corresponding data
    companyNames.forEach((n, i) => {
      var JSONobj = JSON.parse(JSON.stringify({ name: n, data: companiesData[i] }))
      series.push(JSONobj)
    })
    console.log('series: ', series)
    return series
  }

  private prepareLineBarChartsData(companyNames: string[], temporalData: TemporalDataDTO[][]): any[] {
    let tmp: TemporalDataDTO[][] = []
    let companyData: any[] = []
    let companiesData: any[] = []
    let series: any[][] = []
    temporalData.forEach(t => {
      // sorting each temporal data is very important for line chart
      t.sort((d1, d2) => this.fromCustomDateToDate(d1.date).getTime() - this.fromCustomDateToDate(d2.date).getTime())
      tmp.push(t)
    })
    // storing each company data inside companiesData
    tmp.forEach(t => {
      t.forEach(tData => {
        companyData.push([this.fromCustomDateToDate(tData.date).getTime(), tData.content])
      })
      companiesData.push(companyData)
      companyData = []
    })
    // create series with company name and corresponding data
    companyNames.forEach((n, i) => {
      var JSONobj = JSON.parse(JSON.stringify({ name: n, data: companiesData[i] }))
      series.push(JSONobj)
    })
    return series
  }

  private prepareScatterPlotData(companyNames: string[], parameterData: ParameterDataDTO[][]): any[] {
    let companyData: any[] = []
    let companiesData: any[] = []
    let series: any[][] = []
    // storing each company data inside companiesData
    parameterData.forEach(p => {
      p.forEach(pData => {
        pData.y.forEach(y => companyData.push(([pData.x, y])))
      })
      companiesData.push(companyData)
      companyData = []
    })
    // create series with company name and corresponding data
    companyNames.forEach((n, i) => {
      var JSONobj = JSON.parse(JSON.stringify({ name: n, data: companiesData[i] }))
      series.push(JSONobj)
    })
    return series
  }

  // Funziona per la singola azienda! Pensre a come fare per più aziende ma bene o male dovrebbe andare bene lo stesso
  private prepareAreaChartData(labels: string[], contents: number[]): any[] {
    let series: any[] = []
    labels.forEach((l, i) => {
      var JSONobj = JSON.parse(JSON.stringify({ name: l, data: contents[i] }))
      series.push(JSONobj)
    })
    console.log('series: ', series)
    return series
  }

  private preparePieChartData(companyNames: string[], pieData: PieDataDTO[][]): Map<string, any[]> {
    let pieLabelsData = new Map<string, any[]>() // label : [companyName, contentData]
    pieData.forEach((p, i) => {
      p.forEach(pData => {
        if (!pieLabelsData.has(pData.label))
          pieLabelsData.set(pData.label, [companyNames[i], pData.contentData])
      })
    })
    return pieLabelsData
  }


  /**
   * Converts the boxPlotDataDTO in a Date
   * @param b the parameter of type BoxPlotDataDTO
   * @returns the new converted Date
   */
  private fromCustomDateToDate(date: CustomDate): Date {
    return new Date(date.year, date.month, date.day)
  }

  private fromStringToCustomDate(date: string): CustomDate {
    let d = new Date(date)
    return new CustomDate(d.getDate(), d.getMonth() + 1, d.getFullYear())
  }

  get initial(): boolean {
    return this._initial;
  }

  set initial(initial) {
    this._initial = initial;
  }

  private createTemporalChart(series: any[], type: ChartType) {
    this.chartOptions = {
      series: series,
      chart: {
        type: type,
        height: 350
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ],
        xaxis: [
          {
            x: new Date(this.dateFrom).getTime(),
            borderColor: "#999",
            label: {
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
      },
      yaxis: {
        title: {
          text: this.yAxisTitle
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        //min: new Date(this.dateFrom).getTime(), // TODO: scomentare con i dati veri
        tickAmount: 10
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      stroke: {
        width: 1  // to resize width line
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          barHeight: '30%',
        }
      }
      /*fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }*/
    };
    this._initial = true;
  }

  /*public updateChartOptions(option: any): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }*/

  private createParametersChart(series: any[]) {
    this.chartOptions = {
      series: series,
      chart: {
        height: 350,
        type: "scatter",
        zoom: {
          enabled: true,
          type: 'xy'
        },
        toolbar: {
          show: true
        }
      },
      title: {
        text: ""
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1)
          }
        }
      },
      yaxis: {
        title: {
          text: this.yAxisTitle
        }, tickAmount: 7
      }
    };
    //console.log('data: ', this.chartOptions.series)
    this._initial = true;
  }

  generateAreaChart(series: any[]) {
    this.chartOptions = {
      series: series,
      chart: {
        height: 350,
        type: "area"
      },
      stroke: {
        curve: 'smooth',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this._initial = true;
  }



  createPieChart(series: any[], labels: string[]) {
    this.chartOptions = {
      series: series,
      chart: {
        height: 350,
        //width: 380,
        type: "pie"
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this._initial = true;
  }

}
