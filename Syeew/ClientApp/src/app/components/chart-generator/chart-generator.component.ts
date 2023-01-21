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
import { QuantitativeDataService } from 'src/app/services/quantitative-data.service';
import { PlotsService } from 'src/app/services/plots.service';
import { BoxPlotDataDTO } from 'src/app/Utils/DTOs/BoxPlotDataDTO';
import { lastValueFrom } from 'rxjs';

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
  companyData!: IQuantitativeData[]
  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  public activeOptionButton = "all";

  d = [
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
        min: undefined,
        max: undefined
      }
    }
  };

  constructor(private _serviceData: QuantitativeDataService, private plotService: PlotsService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.generatePlot(this.nameChart)
  }

  ngOnInit(): void {
  }

  generatePlot(chartName: string) {
    switch (chartName) {
      case 'boxplot': {
        this.createTemporalChart(this.selectedCompany.nomeAttivita, "boxPlot", this.getDataInYear(new Date(this.dateFrom), new Date(this.dateTo), this.yAxis), this.yAxis)
        break;
      }
      case 'barchart': {
        this.createTemporalChart(this.selectedCompany.nomeAttivita, "bar", this.getDataInYear(new Date(this.dateFrom), new Date(this.dateTo), this.yAxis), this.yAxis)
        break;
      }
      case 'linechart': {
        this.createTemporalChart(this.selectedCompany.nomeAttivita, "line", this.getDataInYear(new Date(this.dateFrom), new Date(this.dateTo), this.yAxis), this.yAxis)
        break;
      }
      case 'scatterplot': {
        this.createParametersChart(this.selectedCompany.nomeAttivita, "scatter", this.getDataNumbersInYear(new Date(this.dateFrom), new Date(this.dateTo), this.xAxis!, this.yAxis), this.xAxis!, this.yAxis)
        break;
      }
      case 'piechart': {
        this.generatePieChart()
        break;
      }
    }
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
    let yDatetime: number
    this.filteredQuantitativeData.filter((qtData) => {
      if (yDatetime == 0)
        yDatetime = new Date(qtData.dt).getTime()
      if (yDatetime >= dateFrom.getTime() && yDatetime <= dateTo.getTime()) {
        console.log('data corrente: ', yDatetime)
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
        console.log('maphasx: ', map.has(tmpX))
        if (map.has(tmpX))
          console.log('mapnotcontainsy: ', !map.get(tmpX)!.includes(yData))
        if (map.has(tmpX) && !map.get(tmpX)!.includes(yData)) {
          console.log('entered')
          map.get(tmpX)!.push(yData)
        }
        else {
          console.log('elseeee')
          let arr: number[] = []
          arr.push(yData)
          map.set(tmpX, arr)
          yDatetime = 0
        }
      }
    })
    return map
  }

  /*private getDataInYear(dateFrom: Date, dateTo: Date, data: string): Map<string, number[]> {
    let map = new Map<string, number[]>()
    let janFrom: number[] = [], febFrom: number[] = [], marFrom: number[] = [], aprFrom: number[] = [], mayFrom: number[] = [], juneFrom: number[] = [], julyFrom: number[] = [],
      augFrom: number[] = [], sepFrom: number[] = [], octFrom: number[] = [], novFrom: number[] = [], decFrom: number[] = []
    let janTo: number[] = [], febTo: number[] = [], marTo: number[] = [], aprTo: number[] = [], mayTo: number[] = [], juneTo: number[] = [], julyTo: number[] = [],
      augTo: number[] = [], sepTo: number[] = [], octTo: number[] = [], novTo: number[] = [], decTo: number[] = []
    this.filteredQuantitativeData.filter((qtData) => {
      let y = new Date(qtData.dt)
      let tmp = null // to store a data depending on netto, iva, fattivato and qta
      if (y.getFullYear() == dateFrom.getFullYear() || y.getFullYear() == dateTo.getFullYear()) {
        switch (data) { // storing in tmp
          case "Netto": {
            tmp = qtData.netto
            break;
          }
          case "Iva": {
            tmp = qtData.iva
            break;
          }
          case "FatturatoIvato": {
            tmp = qtData.fattIvato
            break;
          }
          case "Quantità": {
            tmp = qtData.qta
            break;
          }
          case "N. Dipendenti": {
            tmp = qtData.dim
            break;
          }
        }
        if (y.getMonth() == 0 && y.getFullYear() == dateFrom.getFullYear()) // from january
          janFrom.push(tmp!)
        else if (y.getMonth() == 0 && y.getFullYear() == dateTo.getFullYear()) // to january 
          janTo.push(tmp!)
        if (y.getMonth() == 1 && y.getFullYear() == dateFrom.getFullYear()) // from february
          febFrom.push(tmp!)
        else if (y.getMonth() == 1 && y.getFullYear() == dateTo.getFullYear()) // to february
          febTo.push(tmp!)
        if (y.getMonth() == 2 && y.getFullYear() == dateFrom.getFullYear()) // from march
          marFrom.push(tmp!)
        else if (y.getMonth() == 2 && y.getFullYear() == dateTo.getFullYear()) // to march 
          marTo.push(tmp!)
        if (y.getMonth() == 3 && y.getFullYear() == dateFrom.getFullYear()) // from april
          aprFrom.push(tmp!)
        else if (y.getMonth() == 3 && y.getFullYear() == dateTo.getFullYear()) // to april
          aprTo.push(tmp!)
        if (y.getMonth() == 4 && y.getFullYear() == dateFrom.getFullYear()) // from may
          mayFrom.push(tmp!)
        else if (y.getMonth() == 4 && y.getFullYear() == dateTo.getFullYear()) // to may 
          mayTo.push(tmp!)
        if (y.getMonth() == 5 && y.getFullYear() == dateFrom.getFullYear()) // from june
          juneFrom.push(tmp!)
        else if (y.getMonth() == 5 && y.getFullYear() == dateTo.getFullYear()) // to june
          juneTo.push(tmp!)
        if (y.getMonth() == 6 && y.getFullYear() == dateFrom.getFullYear()) // from july
          julyFrom.push(tmp!)
        else if (y.getMonth() == 6 && y.getFullYear() == dateTo.getFullYear()) // to july 
          julyTo.push(tmp!)
        if (y.getMonth() == 7 && y.getFullYear() == dateFrom.getFullYear()) // from august
          augFrom.push(tmp!)
        else if (y.getMonth() == 7 && y.getFullYear() == dateTo.getFullYear()) // to august
          augTo.push(tmp!)
        if (y.getMonth() == 8 && y.getFullYear() == dateFrom.getFullYear()) // from september
          sepFrom.push(tmp!)
        else if (y.getMonth() == 8 && y.getFullYear() == dateTo.getFullYear()) // to september
          sepTo.push(tmp!)
        if (y.getMonth() == 9 && y.getFullYear() == dateFrom.getFullYear()) // from october
          octFrom.push(tmp!)
        else if (y.getMonth() == 9 && y.getFullYear() == dateTo.getFullYear()) // to october
          octTo.push(tmp!)
        if (y.getMonth() == 10 && y.getFullYear() == dateFrom.getFullYear()) // from november
          novFrom.push(tmp!)
        else if (y.getMonth() == 10 && y.getFullYear() == dateTo.getFullYear()) // to november 
          novTo.push(tmp!)
        if (y.getMonth() == 11 && y.getFullYear() == dateFrom.getFullYear()) // from december
          decFrom.push(tmp!)
        else if (y.getMonth() == 11 && y.getFullYear() == dateTo.getFullYear()) // to december
          decTo.push(tmp!)
      }
    })
    // ----------------- from month
    if (janFrom.length != 0)
      map.set("January ".concat(dateFrom.getFullYear().toString()), janFrom!)
    if (febFrom.length != 0)
      map.set("February ".concat(dateFrom.getFullYear().toString()), febFrom!)
    if (marFrom.length != 0)
      map.set("March ".concat(dateFrom.getFullYear().toString()), marFrom!)
    if (aprFrom.length != 0)
      map.set("April ".concat(dateFrom.getFullYear().toString()), aprFrom!)
    if (mayFrom.length != 0)
      map.set("May ".concat(dateFrom.getFullYear().toString()), mayFrom!)
    if (juneFrom.length != 0)
      map.set("June ".concat(dateFrom.getFullYear().toString()), juneFrom!)
    if (julyFrom.length != 0)
      map.set("July ".concat(dateFrom.getFullYear().toString()), julyFrom!)
    if (augFrom.length != 0)
      map.set("August ".concat(dateFrom.getFullYear().toString()), augFrom!)
    if (sepFrom.length != 0)
      map.set("September ".concat(dateFrom.getFullYear().toString()), sepFrom!)
    if (octFrom.length != 0)
      map.set("October ".concat(dateFrom.getFullYear().toString()), octFrom!)
    if (novFrom.length != 0)
      map.set("November ".concat(dateFrom.getFullYear().toString()), novFrom!)
    if (decFrom.length != 0)
      map.set("December ".concat(dateFrom.getFullYear().toString()), decFrom!)
    // ----------------- to month
    if (janTo.length != 0)
      map.set("January ".concat(dateTo.getFullYear().toString()), janTo!)
    if (febTo.length != 0)
      map.set("February ".concat(dateTo.getFullYear().toString()), febTo!)
    if (marTo.length != 0)
      map.set("March ".concat(dateTo.getFullYear().toString()), marTo!)
    if (aprTo.length != 0)
      map.set("April ".concat(dateTo.getFullYear().toString()), aprTo!)
    if (mayTo.length != 0)
      map.set("May ".concat(dateTo.getFullYear().toString()), mayTo!)
    if (juneTo.length != 0)
      map.set("June ".concat(dateTo.getFullYear().toString()), juneTo!)
    if (julyTo.length != 0)
      map.set("July ".concat(dateTo.getFullYear().toString()), julyTo!)
    if (augTo.length != 0)
      map.set("August ".concat(dateTo.getFullYear().toString()), augTo!)
    if (sepTo.length != 0)
      map.set("September ".concat(dateTo.getFullYear().toString()), sepTo!)
    if (octTo.length != 0)
      map.set("October ".concat(dateTo.getFullYear().toString()), octTo!)
    if (novTo.length != 0)
      map.set("November ".concat(dateTo.getFullYear().toString()), novTo!)
    if (decTo.length != 0)
      map.set("December ".concat(dateTo.getFullYear().toString()), decTo!)
    return map
  }*/

  private createTemporalChart(titleText: string, newType: ChartType, map: Map<number, number[]>, yAxisTitle: string) {
    let months = Array.from(map.keys())
    console.log('map: ', map)
    let dataFromMap: any
    months.forEach(m => {
      //console.log(`{"x" : '${m}' ,"y" : [${map.get(m)}]}`)
      //var obj = JSON.parse(`{"x" : "${m}" ,"y" : [${map.get(m)}]}`);
      /*map.get(m)?.forEach(e => {
        dataFromMap.push(e)
      })*/
      let sum = 0.0
      map.get(m)?.forEach(e => {
        sum = sum + Number.parseFloat(e.toFixed(2))
      })
      dataFromMap.push([m, sum])
    })
    console.log('aaamdedjejjr: ', dataFromMap)
    // PRENDERE GIORNO COME X E DATO COME Y -> FARE 12 TICK PER TUTTI I MESI E FUNZIONERA'
    let z: any
    if (newType == 'boxPlot') {
      z = [
        ['Jan 2015', [54, 66, 90, 75, 88]]
        /*{
          x: 'Jan 2015',
          y: [54, 66, 90, 75, 88]
        },
        {
          x: 'Jan 2016',
          y: [43, 65, 69, 76, 81]
        },
        {
          x: 'Jan 2017',
          y: [31, 39, 45, 51, 59]
        },
        {
          x: 'Jan 2018',
          y: [39, 46, 55, 65, 71]
        },
        {
          x: 'Jan 2019',
          y: [29, 31, 35, 39, 44]
        },
        {
          x: 'Jan 2020',
          y: [41, 49, 58, 61, 67]
        },
        {
          x: 'Jan 2021',
          y: [54, 59, 66, 71, 88]
        }*/
      ]
      this.d = z
    }
    this.chartOptions = {
      series: [
        {
          data: this.d
        }
      ],
      chart: {
        type: newType,
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
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        //min: new Date(this.dateFrom).getTime(),
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
    console.log(map)
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
    var obj = JSON.parse(`{"name": "${xAxisTitle + ' ' + yAxisTitle}",
    "data": [${dataFromMap}]}`);
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
        title: {
          text: xAxisTitle
        },
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

  /*generateBubbleChart() {
      this.chartOptions = {
        series: [
          {
            name: 'Product1',
            data: [[new Date('December 1, 2022').getTime(), 43, 28],
            [new Date('December 1, 2022').getTime(), 12, 108],
            [new Date('December 2, 2022').getTime(), 45, 82],
            [new Date('December 2, 2022').getTime(), 96, 138],
            [new Date('December 2, 2022').getTime(), 52, 12],
            [new Date('December 3, 2022').getTime(), 2, 12],
            [new Date('December 3, 2022').getTime(), 17, 132],
            [new Date('December 3, 2022').getTime(), 57, 198],
            [new Date('December 3, 2022').getTime(), 25, 120],
            [new Date('December 4, 2022').getTime(), 29, 126],
            [new Date('December 4, 2022').getTime(), 21, 129],
            [new Date('December 4, 2022').getTime(), 13, 142],
            [new Date('December 5, 2022').getTime(), 17, 162],
            [new Date('December 6, 2022').getTime(), 98, 222],
            [new Date('December 7, 2022').getTime(), 122, 101],
            [new Date('December 7, 2022').getTime(), 33, 87],
            [new Date('December 7, 2022').getTime(), 41, 99],
            [new Date('December 8, 2022').getTime(), 69, 101],
            [new Date('December 8, 2022').getTime(), 16, 111],
            [new Date('December 8, 2022').getTime(), 72, 70],
            [new Date('December 9, 2022').getTime(), 83, 66],
            [new Date('December 9, 2022').getTime(), 91, 102],
            [new Date('December 9, 2022').getTime(), 20, 130],
            [new Date('December 9, 2022').getTime(), 27, 121]
            ]
          },
          {
            name: 'Product2',
            data: [[new Date('December 1, 2022').getTime(), 31, 208],
            [new Date('December 4, 2022').getTime(), 13, 99],
            [new Date('December 4, 2022').getTime(), 16, 55],
            [new Date('December 4, 2022').getTime(), 98, 138],
            [new Date('December 4, 2022').getTime(), 182, 95],
            [new Date('December 6, 2022').getTime(), 48, 112],
            [new Date('December 6, 2022').getTime(), 31, 105],
            [new Date('December 6, 2022').getTime(), 42, 98],
            [new Date('December 6, 2022').getTime(), 59, 78],
            [new Date('December 8, 2022').getTime(), 50, 90],
            [new Date('December 8, 2022').getTime(), 111, 100],
            [new Date('December 8, 2022').getTime(), 179, 139],
            [new Date('December 8, 2022').getTime(), 4, 102],
            [new Date('December 8, 2022').getTime(), 98, 135],
            [new Date('December 8, 2022').getTime(), 105, 143],
            [new Date('December 9, 2022').getTime(), 120, 110],
            [new Date('December 9, 2022').getTime(), 34, 102],
            [new Date('December 10, 2022').getTime(), 61, 108],
            [new Date('December 10, 2022').getTime(), 10, 103],
            [new Date('December 11, 2022').getTime(), 72, 160],
            [new Date('December 11, 2022').getTime(), 19, 139],
            [new Date('December 12, 2022').getTime(), 27, 90],
            [new Date('December 12, 2022').getTime(), 100, 108],
            [new Date('December 12, 2022').getTime(), 15, 109]
            ]
          }
        ],
        chart: {
          height: 350,
          type: 'bubble',
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
        },
        title: {
          text: '3D Bubble Chart'
        },
        xaxis: {
          tickAmount: 12,
          type: 'datetime',
          labels: {
            rotate: 0,
          }
        },
        yaxis: {
          max: 70
        },
        theme: {
          palette: 'palette2'
        }
      };
      this._initial = true;
    }
  
    generateColumnChart() {
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
        }
      };
      this._initial = true;
    }
  
    private createChart(newType: ChartType) {
      this.chartOptions = {
        series: [{
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
          },
          {
            x: "April 2022",
            y: [462, 17, 34, 120, 272, 867, 353, 93, 935, 974, 639, 641, 754, 647, 631, 65, 401, 184, 970, 110, 620, 981, 891, 700, 849, 895, 299, 399, 419, 437, 880, 75, 649, 835, 274, 932, 16, 926, 11, 714, 373, 986, 79, 356, 243, 51, 108, 721, 372, 277, 628, 893, 983, 175, 992, 263, 357, 483, 743, 486, 692, 310, 289, 227, 199, 662, 812, 711, 691, 747, 360, 704, 573, 834, 417, 854, 592, 502, 917, 420, 54, 549, 94, 265, 941, 445, 975, 622, 606, 451, 928, 512, 441, 273, 735, 667, 334, 216, 830, 875, 561, 616, 777, 519, 884, 326, 892, 718, 748, 828, 581, 221, 302, 576, 900, 363, 697, 140, 350, 713, 653, 429, 950, 136, 476, 736, 936, 280, 296, 807, 948, 96, 180, 951, 181, 410, 964, 469, 752, 312, 999, 760, 185, 844, 500, 719, 869, 456, 308, 652, 121, 769, 955, 46, 487, 966, 155, 618, 83, 902, 946, 654, 176, 564, 428, 139, 37, 516, 81, 611, 744, 314, 24, 659, 671, 293, 687, 563, 546, 824, 497, 879, 156, 15, 764, 229, 430, 235, 759, 822, 253, 242, 658, 458, 722, 814, 27, 608, 556, 543]
          },
          {
            x: "May 2022",
            y: [258, 285, 874, 756, 890, 160, 483, 808, 632, 851, 74, 93, 992, 394, 1, 168, 239, 891, 512, 996, 862, 97, 624, 185, 842, 929, 59, 65, 201, 465, 125, 387, 761, 522, 974, 731, 453, 823, 866, 468, 625, 737, 886, 423, 357, 805, 814, 208, 228, 592, 359, 444, 7, 376, 600, 54, 364, 220, 390, 965, 3, 936, 318, 340, 256, 863, 240, 508, 773, 921, 323, 940, 427, 694, 729, 649, 747, 759, 164, 241, 324, 396, 420, 290, 339, 217, 179, 227, 132, 207, 887, 599, 231, 985, 809, 882, 90, 264, 85, 225, 21, 609, 274, 509, 278, 55, 614, 109, 845, 758, 130, 301, 744, 927, 584, 931, 410, 775, 307, 807, 646, 517, 698, 993, 620, 129, 704, 617, 249, 482, 785, 96, 365, 552, 576, 322, 917, 112, 544, 445, 295, 751, 222, 373, 732, 349, 837, 416, 152, 788, 9, 546, 415, 438, 447, 875, 906, 481, 877, 722, 237, 63, 124, 734, 942, 411, 169, 250, 970, 897, 326, 521, 34, 70, 31, 760, 219, 661, 337, 116, 719, 60, 865, 106, 170, 187, 87, 674, 107, 832, 688, 28, 312, 636, 696, 418, 353, 422, 560, 503]
          },
          {
            x: "June 2022",
            y: [553, 249, 273, 794, 761, 62, 922, 274, 404, 390, 842, 724, 595, 28, 979, 836, 574, 448, 876, 368, 128, 985, 22, 336, 911, 754, 60, 372, 208, 304, 455, 488, 447, 375, 942, 388, 382, 837, 180, 860, 413, 621, 866, 457, 951, 443, 107, 71, 740, 449, 992, 384, 880, 696, 84, 537, 320, 466, 556, 152, 980, 739, 41, 627, 575, 169, 803, 674, 492, 159, 109, 68, 919, 136, 496, 432, 175, 759, 259, 155, 485, 177, 869, 87, 901, 914, 184, 847, 322, 938, 356, 622, 479, 219, 697, 821, 172, 38, 283, 508, 414, 687, 861, 631, 229, 510, 725, 972, 744, 559, 953, 153, 872, 579, 789, 150, 845, 32, 271, 279, 533, 650, 769, 92, 873, 291, 791, 867, 282, 47, 352, 801, 345, 244, 201, 262, 935, 82, 930, 98, 285, 790, 710, 957, 565, 630, 940, 193, 295, 470, 571, 309, 685, 775, 8, 931, 195, 717, 134, 934, 198, 371, 316, 712, 833, 615, 125, 451, 31, 864, 981, 408, 947, 976, 577, 105, 512, 306, 30, 65, 433, 708, 461, 240, 330, 176, 261, 546, 215, 385, 436, 632, 137, 167, 831, 9, 816, 903, 39, 472]
          },
          {
            x: "July 2022",
            y: [186, 219, 830, 736, 261, 541, 404, 882, 603, 783, 545, 953, 451, 452, 609, 74, 177, 288, 911, 391, 86, 848, 801, 184, 685, 439, 125, 403, 619, 14, 221, 217, 914, 709, 367, 55, 180, 747, 304, 942, 531, 532, 662, 191, 771, 525, 780, 197, 129, 999, 477, 50, 118, 32, 323, 102, 161, 78, 96, 123, 39, 18, 986, 143, 116, 581, 960, 932, 938, 628, 505, 227, 362, 931, 387, 548, 927, 958, 556, 586, 626, 329, 37, 231, 256, 364, 850, 773, 24, 905, 769, 6, 792, 902, 241, 369, 347, 746, 185, 341, 259, 148, 145, 70, 295, 474, 644, 806, 470, 480, 254, 737, 827, 952, 73, 320, 306, 339, 936, 879, 937, 878, 147, 972, 894, 819, 365, 1, 880, 778, 38, 763, 884, 648, 573, 224, 776, 94, 40, 888, 840, 622, 764, 376, 100, 425, 713, 499, 997, 858, 155, 396, 701, 978, 742, 853, 979, 906, 579, 669, 243, 212, 377, 990, 282, 214, 81, 527, 653, 717, 393, 881, 354, 218, 281, 559, 731, 352, 739, 714, 416, 733, 982, 275, 601, 745, 235, 210, 955, 814, 192, 52, 31, 757, 521, 575, 666, 690, 516, 630]
          },
          {
            x: "August 2022",
            y: [937, 486, 993, 189, 888, 184, 938, 927, 830, 621, 160, 539, 178, 285, 500, 973, 48, 376, 200, 652, 941, 646, 102, 550, 891, 626, 706, 347, 341, 782, 727, 123, 784, 202, 587, 790, 487, 93, 775, 50, 714, 162, 81, 173, 467, 220, 847, 908, 199, 54, 396, 260, 274, 302, 685, 210, 546, 406, 461, 479, 58, 98, 110, 825, 980, 71, 408, 298, 879, 221, 294, 10, 24, 744, 951, 246, 132, 230, 108, 740, 489, 777, 901, 366, 528, 585, 704, 435, 437, 86, 581, 427, 122, 975, 839, 766, 88, 30, 960, 695, 647, 653, 17, 259, 641, 65, 424, 44, 954, 747, 158, 915, 515, 556, 984, 340, 466, 120, 217, 485, 213, 320, 637, 662, 181, 921, 903, 443, 280, 551, 594, 265, 414, 514, 335, 177, 170, 632, 608, 375, 987, 392, 633, 140, 300, 105, 276, 401, 478, 989, 596, 262, 224, 563, 511, 723, 535, 795, 159, 859, 136, 708, 438, 999, 588, 677, 779, 518, 673, 157, 106, 624, 761, 307, 700, 552, 922, 561, 963, 801, 70, 571, 306, 885, 737, 579, 880, 139, 180, 570, 191, 968, 656, 351, 364, 781, 649, 894, 208, 752]
          },
          {
            x: "September 2022",
            y: [295, 255, 82, 19, 64, 116, 673, 290, 662, 104, 719, 668, 127, 682, 12, 205, 445, 684, 2, 553, 716, 143, 605, 770, 188, 948, 350, 27, 767, 872, 68, 171, 167, 830, 907, 644, 910, 13, 600, 689, 805, 95, 308, 398, 766, 71, 855, 713, 744, 978, 448, 247, 580, 474, 784, 879, 643, 953, 51, 612, 327, 120, 48, 703, 641, 125, 707, 518, 772, 486, 623, 836, 807, 931, 503, 875, 183, 537, 242, 230, 635, 917, 306, 50, 253, 274, 806, 700, 661, 696, 980, 819, 117, 479, 265, 940, 667, 804, 515, 297, 225, 669, 177, 72, 896, 129, 840, 928, 934, 726, 705, 464, 935, 114, 674, 377, 816, 881, 261, 504, 372, 820, 808, 867, 610, 320, 428, 528, 455, 31, 170, 987, 577, 118, 857, 950, 39, 228, 105, 195, 73, 636, 496, 3, 346, 214, 902, 40, 184, 319, 923, 217, 361, 887, 402, 947, 463, 101, 588, 271, 620, 835, 709, 149, 900, 367, 994, 311, 476, 739, 421, 536, 83, 975, 432, 788, 85, 495, 692, 336, 826, 392, 651, 407, 365, 348, 110, 266, 584, 675, 582, 585, 862, 57, 521, 161, 645, 550, 399, 293]
          },
          {
            x: "October 2022",
            y: [743, 853, 897, 714, 304, 481, 697, 488, 425, 38, 985, 77, 623, 644, 850, 128, 787, 919, 84, 215, 777, 532, 150, 528, 973, 813, 551, 723, 975, 863, 176, 244, 991, 112, 443, 852, 960, 320, 181, 667, 229, 698, 801, 992, 673, 788, 699, 935, 424, 117, 133, 438, 336, 145, 504, 613, 114, 824, 970, 489, 101, 948, 359, 550, 653, 78, 187, 41, 306, 978, 567, 956, 342, 647, 544, 520, 563, 23, 339, 450, 182, 316, 121, 446, 137, 888, 305, 826, 530, 423, 461, 585, 533, 997, 608, 249, 40, 51, 340, 570, 734, 208, 814, 892, 510, 702, 572, 458, 762, 230, 552, 851, 655, 782, 50, 493, 319, 730, 344, 250, 159, 436, 288, 149, 45, 665, 694, 668, 942, 731, 19, 103, 889, 554, 883, 228, 914, 964, 95, 944, 39, 990, 447, 838, 444, 94, 126, 928, 848, 47, 67, 840, 282, 5, 582, 302, 577, 768, 75, 196, 778, 31, 521, 549, 475, 85, 603, 967, 910, 184, 887, 745, 281, 789, 139, 295, 1000, 240, 868, 387, 186, 457, 725, 116, 662, 739, 587, 672, 234, 525, 615, 66, 637, 354, 140, 73, 712, 775, 666, 900]
          },
          {
            x: "November 2022",
            y: [888, 991, 724, 754, 707, 357, 774, 583, 580, 692, 416, 205, 811, 639, 18, 953, 768, 958, 883, 411, 547, 954, 434, 914, 167, 183, 911, 32, 68, 962, 848, 859, 155, 785, 543, 393, 328, 478, 322, 159, 814, 966, 490, 838, 189, 691, 957, 21, 325, 699, 619, 734, 418, 10, 818, 836, 91, 473, 493, 26, 275, 344, 726, 81, 270, 31, 673, 715, 570, 229, 241, 927, 895, 718, 657, 17, 302, 651, 131, 979, 214, 596, 121, 541, 703, 198, 873, 108, 614, 839, 778, 816, 548, 2, 399, 535, 463, 346, 27, 526, 290, 710, 792, 597, 604, 261, 11, 55, 383, 391, 550, 789, 834, 341, 100, 347, 429, 184, 116, 395, 291, 631, 798, 278, 161, 259, 169, 148, 643, 759, 330, 898, 269, 219, 753, 138, 689, 920, 172, 99, 337, 600, 350, 107, 780, 787, 441, 546, 857, 752, 34, 505, 821, 646, 340, 372, 589, 304, 480, 127, 258, 345, 786, 988, 467, 217, 625, 96, 942, 740, 620, 112, 964, 390, 808, 607, 497, 70, 300, 46, 970, 829, 449, 677, 907, 252, 485, 621, 693, 777, 40, 793, 171, 206, 129, 638, 781, 973, 439, 723]
          },
          {
            x: "December 2022",
            y: [796, 865, 335, 7, 445, 234, 680, 529, 44, 364, 111, 999, 66, 110, 371, 262, 147, 121, 772, 615, 379, 733, 762, 42, 732, 863, 737, 477, 513, 802, 976, 438, 119, 87, 165, 409, 194, 992, 651, 585, 741, 127, 181, 53, 683, 232, 358, 734, 205, 90, 629, 160, 924, 124, 495, 890, 359, 24, 467, 839, 38, 225, 81, 669, 138, 566, 681, 387, 142, 399, 365, 414, 534, 567, 446, 589, 933, 460, 895, 373, 193, 151, 426, 516, 282, 643, 475, 815, 192, 582, 754, 598, 457, 106, 345, 926, 204, 148, 537, 115, 25, 543, 561, 519, 893, 785, 770, 235, 388, 145, 810, 569, 611, 982, 624, 291, 200, 11, 938, 143, 491, 755, 251, 361, 767, 656, 157, 435, 913, 310, 905, 790, 436, 663, 240, 937, 287, 316, 538, 339, 910, 26, 256, 631, 85, 587, 378, 858, 555, 302, 159, 449, 197, 688, 583, 350, 912, 929, 789, 817, 717, 852, 271, 622, 198, 163, 539, 79, 324, 508, 726, 520, 471, 847, 366, 695, 945, 775, 819, 864, 750, 58, 953, 295, 402, 607, 244, 133, 22, 140, 743, 874, 430, 526, 170, 321, 349, 182, 463, 455]
          }]
        }],
        chart: {
          height: 350,
          type: newType
        },
        title: {
          text: "Company name"
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
  
      };
      this._initial = true;
  
    }
  
    private createChartWith(series: ApexAxisChartSeries,
      chart: ApexChart,
      xaxis: ApexXAxis,
      yaxis: ApexYAxis,
      title: ApexTitleSubtitle,
      stroke: ApexStroke,
      plotOptions: ApexPlotOptions,
      legend: ApexLegend,
      colors: Array<string>,
      dataLabels: ApexDataLabels,
      fill: ApexFill,
      theme: ApexTheme,
      markers: ApexMarkers,
      tooltip: ApexTooltip) {
      this.chartOptions = {
        series: series,
        chart: chart,
        xaxis: xaxis,
        yaxis: yaxis,
        title: title,
        stroke: stroke,
        plotOptions: plotOptions,
        legend: legend,
        colors: colors,
        dataLabels: dataLabels,
        fill: fill,
        theme: theme,
        markers: markers,
        tooltip: tooltip
      }
    }
  
    generateScatterLinePlot() {
      this.chartOptions = {
        series: [{
          name: 'Points',
          type: 'scatter',
  
          //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
          data: [{
            x: 1,
            y: 2.14
          }, {
            x: 1.2,
            y: 2.19
          }, {
            x: 1.8,
            y: 2.43
          }, {
            x: 2.3,
            y: 3.8
          }, {
            x: 2.6,
            y: 4.14
          }, {
            x: 2.9,
            y: 5.4
          }, {
            x: 3.2,
            y: 5.8
          }, {
            x: 3.8,
            y: 6.04
          }, {
            x: 4.55,
            y: 6.77
          }, {
            x: 4.9,
            y: 8.1
          }, {
            x: 5.1,
            y: 9.4
          }, {
            x: 7.1,
            y: 7.14
          }, {
            x: 9.18,
            y: 8.4
          }]
        }, {
          name: 'Line',
          type: 'line',
          data: [{
            x: 1,
            y: 2
          }, {
            x: 2,
            y: 3
          }, {
            x: 3,
            y: 4
          }, {
            x: 4,
            y: 5
          }, {
            x: 5,
            y: 6
          }, {
            x: 6,
            y: 7
          }, {
            x: 7,
            y: 8
          }, {
            x: 8,
            y: 9
          }, {
            x: 9,
            y: 10
          }, {
            x: 10,
            y: 11
          }]
        }],
        chart: {
          height: 350,
          type: 'line',
        },
        fill: {
          type: 'solid',
        },
        markers: {
          size: [6, 0]
        },
        tooltip: {
          shared: false,
          intersect: true,
        },
        legend: {
          show: false
        },
        xaxis: {
          type: 'numeric',
          min: 0,
          max: 12,
          tickAmount: 12
        }
      };
  
      this.initial = true;
    }*/

  /*async*/ generatePieChart() {
    let data: BoxPlotDataDTO[] = []
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

}
