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
import * as ApexCharts from 'apexcharts';
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
  @Input() selectedCompany!: ICompany
  @Input() dateFrom!: string
  @Input() dateTo!: string
  @Input() xAxis?: string
  @Input() yAxis!: string
  @Input() xAxisTitle?: string
  @Input() yAxisTitle!: string
  companyData!: IQuantitativeData[]
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
      case 'boxplotMonth': {
        let boxData!: BoxPlotDataMonthDTO
        await lastValueFrom(this.plotService.getBoxPlotDataMonth(new RequestDataDTO(this.selectedCompany.nomeAttivita,
          this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data: BoxPlotDataMonthDTO) => {
            boxData = data
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
        this.createTemporalChart(this.prepareLineBarChartsData(temporalData), chartName)
        break;
      }
      case 'brush': {
        this.isBrush = true
        let temporalData!: TemporalDataDTO[]
        await lastValueFrom(this.plotService.getTemporalDataDay(new RequestDataDTO(this.selectedCompany.nomeAttivita,
          this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis))).then((data: TemporalDataDTO[]) => {
            temporalData = data
          })
        this.provaBrush(this.prepareLineBarChartsData(temporalData))
        break;
      }
      case 'scatter': {
        let parameterData!: ParameterDataDTO[]
        await lastValueFrom(this.plotService.getParametersDataDay(new RequestDataDTO(this.selectedCompany.nomeAttivita,
          this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateTo), this.yAxis, this.xAxis))).then((data) => {
            parameterData = data
          })
        this.createParametersChart(this.prepareScatterPlotData(parameterData))
        break;
      }
      case 'pie': {
        this.generatePieChart()
        break;
      }
      case 'area': {
        this.generateAreaChart()
        break;
      }
    }
  }

  provaBrush(data: any[]) {
    this.chartOptions = {
      series: [{
        data: data
      }],
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        toolbar: {
          autoSelected: 'pan',
          show: false
        }
      },
      colors: ['#546E7A'],
      stroke: {
        width: 3
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
      series: [{
        data: data
      }],
      chart: {
        id: 'chart1',
        height: 130,
        type: 'area',
        brush: {
          target: 'chart2',
          enabled: true
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date(this.dateFrom).getTime(),
            max: new Date(this.dateTo).getTime()
          }
        },
      },
      colors: ['#008FFB'],
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
    let tmp: TemporalDataDTO[] = []
    let data: any[] = []
    tmp = temporalData.sort((d1, d2) => this.fromCustomDateToDate(d1.date).getTime() - this.fromCustomDateToDate(d2.date).getTime())  // sorting is very important for line chart
    tmp.forEach(t => data.push([this.fromCustomDateToDate(t.date).getTime(), t.content]))
    return data
  }

  private prepareScatterPlotData(parameterData: ParameterDataDTO[]): any[] {
    //let param: ParameterDataDTO[] = []
    let data: any[] = []
    //tmp = temporalData.sort((d1, d2) => this.fromCustomDateToDate(d1.date).getTime() - this.fromCustomDateToDate(d2.date).getTime())  // sorting is very important for line chart
    //tmp.forEach(t => data.push([this.fromCustomDateToDate(t.date).getTime(), t.content]))
    parameterData.forEach(p => {
      p.y.forEach(y => data.push([p.x, y]))
    })
    return data
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

  /*public updateChartOptions(option: any): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }*/

  private createParametersChart(data: any[]) {
    this.chartOptions = {
      series: [{ data: data }],
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
            return parseFloat(val).toFixed(0)
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

  async generatePieChart() {
    console.log('dateFrom: ', this.dateFrom)
    console.log('dateTo: ', this.dateTo)
    console.log('nome: ', this.selectedCompany.nomeAttivita)
    console.log('y: ', this.yAxis)
    let pieData: PieDataDTO[] = []
    await lastValueFrom(this.plotService.getPieDataMonth(new RequestDataDTO(this.selectedCompany.nomeAttivita,
      this.fromStringToCustomDate(this.dateFrom), this.fromStringToCustomDate(this.dateFrom), this.yAxis))).then((d) => {
        pieData = d
      })
    console.log('pie: ', pieData)
    let data: number[] = []
    let labels: string[] = []
    pieData.forEach(d => {
      data.push(d.contentData)
      labels.push(d.label)
    })
    console.log('data: ', data)
    this.chartOptions = {
      series: data, // SOSTITUIRE CON dati passati dal service
      chart: {
        height: 350,
        //width: 380,
        type: "pie"
      },
      labels: labels,
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

}
