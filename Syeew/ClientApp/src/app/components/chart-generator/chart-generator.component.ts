import { OnChanges, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  @Input() selectedCompany!: ICompany
  @Input() dateFrom!: string
  @Input() dateTo!: string
  @Input() filteredQuantitativeData!: IQuantitativeData[]
  @Input() xAxis?: string
  @Input() yAxis!: string
  @Input() xAxisTitle?: string
  @Input() yAxisTitle!: string
  companyData!: IQuantitativeData[]
  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>; // TODO: usarlo al posto di come ho fatto ora
  public activeOptionButton = "all"; //TODO: dopo
  @Input() showTimeButtons!: boolean // to show buttons that change a period in a chart (1 month, 6 month, 1 year)

  // TODO: pensarci dopo e pensare bene ai controlli
  public updateOptionsData: any = {
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
  };

  constructor(private plotService: PlotsService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.generatePlot(this.nameChart)
  }

  ngOnInit(): void {
  }

  async generatePlot(chartName: string) {
    switch (chartName) {
      case 'boxplotDay': {
        let boxData: BoxPlotDataDTO[] = []
        await lastValueFrom(this.plotService.getBoxPlotDataDay(new RequestDataDTO(this.selectedCompany.nomeAttivita,
          this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data) => {
            boxData = data
          })
        this.createTemporalChart(this.prepareBoxPlotDayData(boxData), "boxPlot")
        break;
      }
      // TODO levare [0] e BoxPlotDataMonthDTO[]
      case 'boxplotMonth': {
        let boxData!: BoxPlotDataMonthDTO
        await lastValueFrom(this.plotService.getBoxPlotDataMonth(new RequestDataDTO(this.selectedCompany.nomeAttivita,
          this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data: BoxPlotDataMonthDTO[]) => {
            boxData = data[0]
          })
        this.createTemporalChart(this.prepareBoxPlotMonthData(boxData), "boxPlot")
        break;
      }
      case 'bar':
      case 'line': {
        let temporalData!: TemporalDataDTO[]
        await lastValueFrom(this.plotService.getTemporalDataDay(new RequestDataDTO(this.selectedCompany.nomeAttivita,
          this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data: TemporalDataDTO[]) => {
            temporalData = data
          })
        // this.createTemporalChart(this.prepareLineBarChartsData(temporalData), chartName) // TODO: scommentare con i dati veri
        this.createTemporalChart(this.getDatiFittizi(), chartName) // TODO: rimuovere con i dati veri
        break;
      }
      case 'scatter': {
        this.createParametersChart(this.selectedCompany.nomeAttivita, chartName, this.getDataNumbersInYear(new Date(this.dateFrom), new Date(this.dateTo), this.xAxis!, this.yAxis), this.xAxis!, this.yAxis)
        break;
      }
      case 'pie': {
        this.generatePieChart()
        break;
      }
      case 'area':{
        this.generateAreaChart()
      }
    }
  }

  private prepareBoxPlotDayData(boxData: BoxPlotDataDTO[]): any[] {
    let data: any[] = []
    boxData.forEach(b => data.push([this.fromCustomDateToDate(b.date).getTime(), b.stats]))
    return data
  }

  private prepareBoxPlotMonthData(boxData: BoxPlotDataMonthDTO): any[] {
    let data: any[] = []
    boxData.months.forEach((m, i) => data.push([m, boxData.stats[i]]))
    return data
  }

  private prepareLineBarChartsData(temporalData: TemporalDataDTO[]): any[] {
    let data: any[] = []
    temporalData.forEach(t => data.push([this.fromCustomDateToDate(t.date), t.content]))
    return data
  }

  provaBoxPlotGiorni(data: any[]) {
    this.chartOptions = {
      series: [
        {
          data: data
        }
      ],
      chart: {
        type: "boxPlot",
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
          text: this.yAxis
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
        min: new Date(this.dateFrom).getTime(),
        tickAmount: 10
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
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

  provaBoxPlotMesi(data: any[]) {

    this.chartOptions = {
      series: [
        {
          data: data
        }
      ],
      chart: {
        type: "boxPlot",
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
          text: this.yAxis
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
        //min: new Date(this.dateFrom).getTime(),
        //tickAmount: 10,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
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

  private getDataInYear(dateFrom: Date, dateTo: Date, data: string): Map<number, number[]> {
    let map = new Map<number, number[]>()
    let tmpX: number // to store a data depending on netto, iva, fattivato, qta and dim
    let yData: number
    let yDatetime: number = 0
    this.filteredQuantitativeData.filter((qtData) => {
      if (yDatetime == 0)
        yDatetime = new Date(qtData.dt).getTime()
      if (yDatetime >= dateFrom.getTime() && yDatetime <= dateTo.getTime()) {
        //console.log('data corrente: ', yDatetime)
        switch (data) { // storing for Y
          case "Netto": {
            yData = qtData.netto
            break;
          }
          case "Iva": {
            yData = qtData.iva
            break;
          }
          case "FatturatoIvato": {
            yData = qtData.fattIvato
            break;
          }
          case "Quantità": {
            yData = qtData.qta
            break;
          }
          case "N. Dipendenti": {
            yData = qtData.dim
            break;
          }
        }
        // checking if x is already in map
        tmpX = yDatetime
        /*console.log('maphasx: ', map.has(tmpX))
        if (map.has(tmpX))
          console.log('mapnotcontainsy: ', !map.get(tmpX)!.includes(yData))*/
        if (map.has(tmpX) && !map.get(tmpX)!.includes(yData)) {
          //console.log('entered')
          map.get(tmpX)!.push(yData)
        }
        else {
          //console.log('elseeee')
          let arr: number[] = []
          arr.push(yData)
          map.set(tmpX, arr)
          yDatetime = 0
        }
      }
    })
    return map
  }

  private createTemporalChart(data: any[], type: ChartType) {
    this.chartOptions = {
      series: [
        {
          data: data
        }
      ],
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

  public updateChartOptions(option: any): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }

  private getDataNumbersInYear(dateFrom: Date, dateTo: Date, xAxisData: string, yAxisData: string): Map<number, number[]> {
    let map = new Map<number, number[]>()
    let tmpX: number // to store a data depending on netto, iva, fattivato, qta and dim
    let yData: number
    let yDatetime: any = null
    this.filteredQuantitativeData.filter((qtData) => {
      if (yDatetime == null)
        yDatetime = new Date(qtData.dt)
      if (yDatetime.getFullYear() >= dateFrom.getFullYear() && yDatetime.getFullYear() <= dateTo.getFullYear()) {
        switch (xAxisData) { // storing in tmpX
          case "Netto": {
            tmpX = qtData.netto
            break;
          }
          case "Iva": {
            tmpX = qtData.iva
            break;
          }
          case "FatturatoIvato": {
            tmpX = qtData.fattIvato
            break;
          }
          case "Quantità": {
            tmpX = qtData.qta
            break;
          }
          case "N. Dipendenti": {
            tmpX = qtData.dim
            break;
          }
        }
        switch (yAxisData) { // storing in tmpY
          case "Netto": {
            yData = qtData.netto
            break;
          }
          case "Iva": {
            yData = qtData.iva
            break;
          }
          case "FatturatoIvato": {
            yData = qtData.fattIvato
            break;
          }
          case "Quantità": {
            yData = qtData.qta
            break;
          }
          case "N. Dipendenti": {
            yData = qtData.dim
            break;
          }
        }
        // checking if x is already in map
        if (map.has(tmpX) && !map.get(tmpX)!.includes(yData))
          map.get(tmpX)!.push(yData)
        else {
          let arr: number[] = []
          arr.push(yData)
          map.set(tmpX, arr)
          yDatetime = null
        }
      }
    })
    return map
  }

  private createParametersChart(titleText: string, newType: ChartType, map: Map<number, number[]>, xAxisTitle: string, yAxisTitle: string) {
    //let xAxis = Array.from(map.keys()).sort((i, j) => i - j)
    //console.log('mappa: ', map)
    let xAxis = Array.from(map.keys())
    let dataFromMap: number[][] = []
    xAxis.forEach(x => {
      map.get(x)!.forEach(y => {
        //console.log(x, ' , ', y)
        //var obj = JSON.parse(`{"x": "${x}", "y" : "${y}"}`);
        //var obj = JSON.parse(`{"x": "${x}", "y" : [${map.get(x)}]}`);
        //var obj = JSON.parse(`{"x": "5", "y" : 1}`);
        //var obj = JSON.parse(`{"x": "5", "y" : 8}`);
        //dataFromMap.push(obj)
        dataFromMap.push([x, y])
      })
    })
    var obj = JSON.parse(`{"name": "${xAxisTitle}","data": [${dataFromMap}]}`);
    this.chartOptions = {
      series: [obj],
      chart: {
        height: 350,
        type: newType,
        zoom: {
          enabled: true,
          type: 'xy'
        },
        toolbar: {
          show: true
        }
      },
      title: {
        text: titleText
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(0)
          }
        }
      },
      yaxis: {
        title: {
          text: yAxisTitle
        }, tickAmount: 7
      }
    };
    //console.log('data: ', this.chartOptions.series)
    this._initial = true;
  }


  // ----------------- Dati fittizi


    /*generateColumnChart() {
      this.chartOptions = {
        chart: {
          height: 350,
          type: 'bar'
        },
        stroke: {
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63']
        },
        yaxis: {
          title: {
            text: 'selt pizza',
            style: {
              fontSize: '15px'
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '40%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        },
        series: [{
          data: [{
            x: 'Margherita',
            y: 100,
            goals: [
              {
                name: 'Expected',
                value: 70,
                strokeColor: '#775DD0',
                strokeHeight: 7
              }
            ]
          }, {
            x: 'Capricciosa',
            y: 18,
            goals: [
              {
                name: 'Expected',
                value: 32,
                strokeColor: '#775DD0',
                strokeHeight: 7
              }
            ]
          }, {
            x: 'Boscaiola',
            y: 13,
            goals: [
              {
                name: 'Expected',
                value: 6,
                strokeColor: '#775DD0',
                strokeHeight: 7
              }
            ]
          }, {
            x: 'Bufala',
            y: 54,
            goals: [
              {
                name: 'Expected',
                value: 52,
                strokeColor: '#775DD0',
                strokeHeight: 7
              }
            ]
          }]
        }]
      }
      this._initial = true;
    }*/
  
  
  
    generateAreaChart() {
      this.chartOptions = {
        series: [{
          name: "Breakfast",
          data: [{
            x: "January 2022",
            y: [633, 532, 88, 255, 728, 92, 1, 144, 671, 194, 476, 709, 241, 127, 163, 789, 465, 147, 472, 534, 952, 169, 422, 994, 833, 31, 757, 540, 640, 989, 256, 941, 26, 388, 964, 356, 133, 411, 790, 794, 689, 317, 579, 596, 478, 473, 190, 58, 646, 761, 262, 175, 676, 836, 225, 372, 346, 234, 605, 94, 793, 2, 811, 801, 718, 369, 295, 900, 195, 842, 123, 340, 259, 497, 909, 113, 963, 565, 244, 524, 212, 217, 916, 917, 247, 252, 332, 100, 815, 985, 455, 271, 47, 348, 394, 349, 149, 345, 326, 279, 918, 270, 924, 409, 229, 570, 803, 890, 95, 595, 592, 867, 739, 39, 887, 477, 864, 951, 623, 931, 990, 335, 970, 301, 129, 432, 457, 929, 601, 173, 893, 921, 758, 290, 187, 580, 395, 146, 414, 740, 114, 707, 273, 557, 679, 892, 599, 104, 24, 609, 366, 778, 714, 715, 240, 381, 877, 200, 905, 112, 712, 919, 732, 854, 238, 911, 65, 280, 624, 505, 423, 987, 59, 172, 382, 300, 667, 607, 812, 548, 202, 543, 974, 723, 536, 727, 621, 749, 298, 616, 747, 885, 121, 488, 763, 452, 469, 903, 380, 738]
          },
          {
            x: "February 2022",
            y: [205, 943, 384, 322, 327, 991, 529, 77, 50, 202, 784, 636, 367, 823, 780, 1000, 317, 959, 946, 593, 728, 853, 931, 138, 786, 576, 515, 63, 465, 622, 471, 787, 406, 722, 935, 703, 615, 595, 172, 966, 101, 115, 141, 129, 760, 694, 777, 772, 741, 875, 764, 627, 565, 343, 584, 802, 644, 938, 681, 153, 191, 449, 521, 238, 569, 1, 800, 579, 123, 179, 425, 279, 538, 423, 415, 104, 911, 937, 266, 558, 405, 949, 353, 864, 87, 341, 61, 528, 51, 830, 93, 621, 708, 17, 80, 965, 500, 789, 446, 4, 292, 338, 854, 574, 75, 740, 276, 742, 688, 162, 664, 390, 720, 883, 122, 527, 57, 517, 225, 716, 243, 411, 653, 706, 296, 461, 661, 668, 132, 813, 30, 699, 273, 291, 280, 903, 320, 804, 546, 542, 827, 532, 84, 586, 347, 67, 554, 161, 978, 433, 480, 408, 32, 400, 570, 439, 186, 945, 556, 312, 116, 767, 234, 617, 623, 401, 418, 289, 90, 629, 845, 508, 967, 880, 468, 730, 265, 597, 492, 858, 602, 961, 504, 494, 268, 110, 872, 846, 383, 936, 567, 506, 868, 386, 159, 743, 254, 887, 659, 178]
          },
          {
            x: "March 2022",
            y: [885, 88, 35, 232, 585, 530, 887, 569, 289, 532, 195, 649, 580, 324, 687, 99, 548, 658, 693, 309, 22, 226, 539, 57, 753, 954, 23, 615, 214, 805, 169, 668, 828, 314, 474, 328, 515, 763, 38, 681, 704, 152, 327, 595, 568, 799, 141, 779, 196, 976, 655, 873, 44, 910, 279, 605, 656, 394, 231, 225, 436, 286, 434, 537, 849, 312, 384, 743, 901, 848, 58, 708, 723, 387, 7, 457, 829, 110, 280, 311, 561, 41, 194, 895, 123, 29, 790, 651, 787, 257, 217, 800, 533, 459, 599, 270, 700, 718, 467, 379, 860, 173, 380, 926, 339, 682, 20, 616, 390, 643, 713, 727, 288, 809, 680, 574, 291, 54, 596, 348, 119, 46, 178, 414, 851, 50, 218, 769, 62, 716, 843, 215, 130, 793, 492, 42, 722, 636, 43, 563, 841, 511, 250, 652, 24, 523, 137, 869, 168, 300, 792, 510, 409, 620, 823, 677, 455, 170, 943, 180, 788, 320, 101, 235, 171, 720, 513, 586, 552, 736, 364, 67, 913, 953, 527, 229, 302, 261, 956, 493, 432, 918, 210, 780, 874, 407, 469, 879, 149, 593, 167, 731, 445, 628, 551, 78, 784, 739, 55, 724]
          }]
        },
        {
          name: "Lunch",
          data: [{
            x: "January 2022",
            y: [71, 70, 873, 426, 353, 709, 746, 185, 775, 46, 170, 211, 299, 85, 320, 407, 934, 773, 335, 194, 518, 682, 700, 500, 334, 908, 192, 442, 22, 675, 587, 977, 872, 257, 865, 54, 863, 91, 339, 824, 546, 74, 902, 447, 611, 940, 553, 476, 561, 328, 281, 434, 371, 951, 309, 377, 582, 925, 790, 292, 140, 217, 864, 835, 797, 808, 913, 877, 463, 405, 355, 321, 104, 167, 112, 319, 466, 268, 432, 796, 745, 277, 241, 141, 927, 597, 306, 369, 879, 2, 67, 737, 884, 90, 999, 109, 503, 564, 143, 820]
          },
          {
            x: "February 2022",
            y: [324, 397, 471, 343, 116, 468, 985, 404, 7, 243, 744, 84, 732, 114, 446, 980, 630, 300, 958, 91, 640, 472, 972, 430, 351, 207, 181, 913, 223, 210, 1000, 48, 546, 699, 757, 163, 444, 35, 990, 628, 600, 741, 143, 723, 905, 221, 935, 702, 367, 394, 294, 192, 576, 997, 514, 763, 945, 661, 54, 801, 568, 959, 926, 701, 854, 839, 83, 459, 329, 275, 813, 464, 798, 695, 227, 674, 151, 791, 305, 543, 51, 694, 545, 135, 106, 488, 492, 407, 943, 869, 790, 245, 828, 389, 515, 387, 852, 841, 987, 857]
          },
          {
            x: "March 2022",
            y: [603, 986, 884, 52, 691, 236, 216, 87, 563, 727, 54, 58, 554, 466, 438, 871, 86, 940, 189, 502, 395, 650, 436, 586, 65, 961, 717, 977, 154, 710, 822, 153, 471, 705, 931, 600, 70, 223, 43, 595, 841, 244, 599, 677, 462, 538, 747, 891, 253, 275, 425, 226, 458, 468, 181, 490, 208, 473, 33, 878, 251, 444, 124, 170, 190, 282, 174, 72, 585, 459, 507, 110, 724, 274, 995, 271, 746, 849, 217, 19, 409, 215, 708, 534, 804, 895, 13, 210, 36, 863, 674, 734, 553, 684, 178, 457, 529, 632, 488, 161]
          }]
        },
        {
          name: "Dinner",
          data: [{
            x: "January 2022",
            y: [515, 884, 269, 733, 271, 840, 163, 328, 849, 756, 322, 887, 815, 146, 149, 161, 797, 431, 584, 962, 217, 673, 252, 893, 579, 984, 513, 392, 168, 540, 339, 28, 568, 566, 102, 255, 340, 416, 421, 115, 318, 772, 592, 472, 182, 739, 705, 29, 275, 366, 582, 620, 774, 547, 761, 197, 398, 376, 585, 180, 61, 490, 231, 750, 734, 397, 440, 995, 505, 512, 904, 973, 216, 40, 338, 172, 13, 368, 654, 663, 323, 619, 201, 930, 232, 891, 525, 444, 311, 786, 239, 538, 292, 707, 667, 858, 270, 656, 504, 184]
          },
          {
            x: "February 2022",
            y: [783, 420, 55, 664, 593, 477, 326, 234, 574, 281, 861, 596, 333, 144, 663, 419, 787, 849, 473, 127, 824, 204, 499, 230, 395, 623, 178, 61, 839, 863, 902, 719, 503, 112, 803, 109, 889, 415, 846, 512, 674, 192, 392, 417, 579, 891, 290, 819, 936, 481, 387, 718, 775, 11, 912, 168, 50, 656, 110, 782, 715, 786, 327, 264, 872, 442, 240, 436, 576, 17, 969, 39, 963, 940, 82, 758, 981, 439, 116, 474, 382, 533, 151, 184, 595, 372, 545, 143, 908, 277, 548, 89, 163, 834, 390, 316, 226, 831, 975, 536]
          },
          {
            x: "March 2022",
            y: [71, 145, 98, 986, 680, 798, 306, 94, 931, 548, 10, 276, 960, 142, 136, 76, 264, 756, 576, 790, 747, 934, 938, 365, 199, 209, 436, 371, 333, 713, 449, 602, 296, 184, 195, 51, 666, 511, 535, 551, 35, 532, 506, 873, 210, 604, 100, 685, 451, 323, 393, 912, 227, 965, 164, 577, 836, 154, 464, 16, 515, 313, 526, 82, 41, 518, 614, 954, 778, 763, 175, 890, 273, 993, 774, 844, 586, 936, 366, 821, 530, 776, 803, 496, 75, 737, 670, 691, 681, 357, 382, 720, 206, 947, 417, 471, 193, 265, 768, 410]
          }]
        }],
        chart: {
          height: 350,
          type: "area"
        },
        stroke: {
          curve: 'smooth',
        }
        ,
        title: {
          text: "Company name"
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
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
  
    

  /*async*/ generatePieChart() {
    console.log('dateFrom: ', this.dateFrom)
    console.log('dateTo: ', this.dateTo)
    console.log('nome: ', this.selectedCompany.nomeAttivita)
    console.log('y: ', this.yAxis)
    let data: PieDataDTO[] = []
    /*await lastValueFrom(this.plotService.getPieDataMonth(this.selectedCompany.nomeAttivita, new Date(this.dateFrom), new Date(this.dateTo), this.xAxis!)).then((d) => {
      data = d
    })*/
    this.chartOptions = {
      series: [44, 55, 13, 43, 22], // SOSTITUIRE CON dati passati dal service
      chart: {
        height: 350,
        //width: 380,
        type: "pie"
      },
      labels: ["Colazione", "Pranzo", "Servizio Bar", "Aperitivo Cena", "After Dinner"],
      title: {
        text: this.selectedCompany.nomeAttivita
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

  private getDatiFittizi(): number[][] {
    return [
      [1327359600000, 30.95],
      [1327359600000, 40.95],
      [1327359600000, 60.95],
      [1327446000000, 31.34],
      [1327532400000, 31.18],
      [1327618800000, 31.05],
      [1327878000000, 31.0],
      [1327964400000, 30.95],
      [1328050800000, 31.24],
      [1328137200000, 31.29],
      [1328223600000, 31.85],
      [1328482800000, 31.86],
      [1328569200000, 32.28],
      [1328655600000, 32.1],
      [1328742000000, 32.65],
      [1328828400000, 32.21],
      [1329087600000, 32.35],
      [1329174000000, 32.44],
      [1329260400000, 32.46],
      [1329346800000, 32.86],
      [1329433200000, 32.75],
      [1329778800000, 32.54],
      [1329865200000, 32.33],
      [1329951600000, 32.97],
      [1330038000000, 33.41],
      [1330297200000, 33.27],
      [1330383600000, 33.27],
      [1330470000000, 32.89],
      [1330556400000, 33.1],
      [1330642800000, 33.73],
      [1330902000000, 33.22],
      [1330988400000, 31.99],
      [1331074800000, 32.41],
      [1331161200000, 33.05],
      [1331247600000, 33.64],
      [1331506800000, 33.56],
      [1331593200000, 34.22],
      [1331679600000, 33.77],
      [1331766000000, 34.17],
      [1331852400000, 33.82],
      [1332111600000, 34.51],
      [1332198000000, 33.16],
      [1332284400000, 33.56],
      [1332370800000, 33.71],
      [1332457200000, 33.81],
      [1332712800000, 34.4],
      [1332799200000, 34.63],
      [1332885600000, 34.46],
      [1332972000000, 34.48],
      [1333058400000, 34.31],
      [1333317600000, 34.7],
      [1333404000000, 34.31],
      [1333490400000, 33.46],
      [1333576800000, 33.59],
      [1333922400000, 33.22],
      [1334008800000, 32.61],
      [1334095200000, 33.01],
      [1334181600000, 33.55],
      [1334268000000, 33.18],
      [1334527200000, 32.84],
      [1334613600000, 33.84],
      [1334700000000, 33.39],
      [1334786400000, 32.91],
      [1334872800000, 33.06],
      [1335132000000, 32.62],
      [1335218400000, 32.4],
      [1335304800000, 33.13],
      [1335391200000, 33.26],
      [1335477600000, 33.58],
      [1335736800000, 33.55],
      [1335823200000, 33.77],
      [1335909600000, 33.76],
      [1335996000000, 33.32],
      [1336082400000, 32.61],
      [1336341600000, 32.52],
      [1336428000000, 32.67],
      [1336514400000, 32.52],
      [1336600800000, 31.92],
      [1336687200000, 32.2],
      [1336946400000, 32.23],
      [1337032800000, 32.33],
      [1337119200000, 32.36],
      [1337205600000, 32.01],
      [1337292000000, 31.31],
      [1337551200000, 32.01],
      [1337637600000, 32.01],
      [1337724000000, 32.18],
      [1337810400000, 31.54],
      [1337896800000, 31.6],
      [1338242400000, 32.05],
      [1338328800000, 31.29],
      [1338415200000, 31.05],
      [1338501600000, 29.82],
      [1338760800000, 30.31],
      [1338847200000, 30.7],
      [1338933600000, 31.69],
      [1339020000000, 31.32],
      [1339106400000, 31.65],
      [1339365600000, 31.13],
      [1339452000000, 31.77],
      [1339538400000, 31.79],
      [1339624800000, 31.67],
      [1339711200000, 32.39],
      [1339970400000, 32.63],
      [1340056800000, 32.89],
      [1340143200000, 31.99],
      [1340229600000, 31.23],
      [1340316000000, 31.57],
      [1340575200000, 30.84],
      [1340661600000, 31.07],
      [1340748000000, 31.41],
      [1340834400000, 31.17],
      [1340920800000, 32.37],
      [1341180000000, 32.19],
      [1341266400000, 32.51],
      [1341439200000, 32.53],
      [1341525600000, 31.37],
      [1341784800000, 30.43],
      [1341871200000, 30.44],
      [1341957600000, 30.2],
      [1342044000000, 30.14],
      [1342130400000, 30.65],
      [1342389600000, 30.4],
      [1342476000000, 30.65],
      [1342562400000, 31.43],
      [1342648800000, 31.89],
      [1342735200000, 31.38],
      [1342994400000, 30.64],
      [1343080800000, 30.02],
      [1343167200000, 30.33],
      [1343253600000, 30.95],
      [1343340000000, 31.89],
      [1343599200000, 31.01],
      [1343685600000, 30.88],
      [1343772000000, 30.69],
      [1343858400000, 30.58],
      [1343944800000, 32.02],
      [1344204000000, 32.14],
      [1344290400000, 32.37],
      [1344376800000, 32.51],
      [1344463200000, 32.65],
      [1344549600000, 32.64],
      [1344808800000, 32.27],
      [1344895200000, 32.1],
      [1344981600000, 32.91],
      [1345068000000, 33.65],
      [1345154400000, 33.8],
      [1345413600000, 33.92],
      [1345500000000, 33.75],
      [1345586400000, 33.84],
      [1345672800000, 33.5],
      [1345759200000, 32.26],
      [1346018400000, 32.32],
      [1346104800000, 32.06],
      [1346191200000, 31.96],
      [1346277600000, 31.46],
      [1346364000000, 31.27],
      [1346709600000, 31.43],
      [1346796000000, 32.26],
      [1346882400000, 32.79],
      [1346968800000, 32.46],
      [1347228000000, 32.13],
      [1347314400000, 32.43],
      [1347400800000, 32.42],
      [1347487200000, 32.81],
      [1347573600000, 33.34],
      [1347832800000, 33.41],
      [1347919200000, 32.57],
      [1348005600000, 33.12],
      [1348092000000, 34.53],
      [1348178400000, 33.83],
      [1348437600000, 33.41],
      [1348524000000, 32.9],
      [1348610400000, 32.53],
      [1348696800000, 32.8],
      [1348783200000, 32.44],
      [1349042400000, 32.62],
      [1349128800000, 32.57],
      [1349215200000, 32.6],
      [1349301600000, 32.68],
      [1349388000000, 32.47],
      [1349647200000, 32.23],
      [1349733600000, 31.68],
      [1349820000000, 31.51],
      [1349906400000, 31.78],
      [1349992800000, 31.94],
      [1350252000000, 32.33],
      [1350338400000, 33.24],
      [1350424800000, 33.44],
      [1350511200000, 33.48],
      [1350597600000, 33.24],
      [1350856800000, 33.49],
      [1350943200000, 33.31],
      [1351029600000, 33.36],
      [1351116000000, 33.4],
      [1351202400000, 34.01],
      [1351638000000, 34.02],
      [1351724400000, 34.36],
      [1351810800000, 34.39],
      [1352070000000, 34.24],
      [1352156400000, 34.39],
      [1352242800000, 33.47],
      [1352329200000, 32.98],
      [1352415600000, 32.9],
      [1352674800000, 32.7],
      [1352761200000, 32.54],
      [1352847600000, 32.23],
      [1352934000000, 32.64],
      [1353020400000, 32.65],
      [1353279600000, 32.92],
      [1353366000000, 32.64],
      [1353452400000, 32.84],
      [1353625200000, 33.4],
      [1353884400000, 33.3],
      [1353970800000, 33.18],
      [1354057200000, 33.88],
      [1354143600000, 34.09],
      [1354230000000, 34.61],
      [1354489200000, 34.7],
      [1354575600000, 35.3],
      [1354662000000, 35.4],
      [1354748400000, 35.14],
      [1354834800000, 35.48],
      [1355094000000, 35.75],
      [1355180400000, 35.54],
      [1355266800000, 35.96],
      [1355353200000, 35.53],
      [1355439600000, 37.56],
      [1355698800000, 37.42],
      [1355785200000, 37.49],
      [1355871600000, 38.09],
      [1355958000000, 37.87],
      [1356044400000, 37.71],
      [1356303600000, 37.53],
      [1356476400000, 37.55],
      [1356562800000, 37.3],
      [1356649200000, 36.9],
      [1356908400000, 37.68],
      [1357081200000, 38.34],
      [1357167600000, 37.75],
      [1357254000000, 38.13],
      [1357513200000, 37.94],
      [1357599600000, 38.14],
      [1357686000000, 38.66],
      [1357772400000, 38.62],
      [1357858800000, 38.09],
      [1358118000000, 38.16],
      [1358204400000, 38.15],
      [1358290800000, 37.88],
      [1358377200000, 37.73],
      [1358463600000, 37.98],
      [1358809200000, 37.95],
      [1358895600000, 38.25],
      [1358982000000, 38.1],
      [1359068400000, 38.32],
      [1359327600000, 38.24],
      [1359414000000, 38.52],
      [1359500400000, 37.94],
      [1359586800000, 37.83],
      [1359673200000, 38.34],
      [1359932400000, 38.1],
      [1360018800000, 38.51],
      [1360105200000, 38.4],
      [1360191600000, 38.07],
      [1360278000000, 39.12],
      [1360537200000, 38.64],
      [1360623600000, 38.89],
      [1360710000000, 38.81],
      [1360796400000, 38.61],
      [1360882800000, 38.63],
      [1361228400000, 38.99],
      [1361314800000, 38.77],
      [1361401200000, 38.34],
      [1361487600000, 38.55],
      [1361746800000, 38.11],
      [1361833200000, 38.59],
      [1361919600000, 39.6]
    ];
  }

}
