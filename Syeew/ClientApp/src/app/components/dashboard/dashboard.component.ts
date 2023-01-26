import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { QuantitativeDataService } from 'src/app/services/quantitative-data.service';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('xAxis') xAxisChoises!: any
  xAxisChoice!: string;
  selectedColor: ThemePalette = 'primary'
  choises: string[] = ['Line Chart', 'Bar Chart', 'Summer', 'Autumn'];
  cards!: any[]
  @Input() selectedCompanies!: ICompany[]
  @Input() dateFrom!: string
  @Input() dateTo!: string
  dateFromProva = new Date(this.dateFrom)

  // pie categories
  categories: string[] = []

  constructor(private qtDataService: QuantitativeDataService) { }

  ngOnInit(): void {
    this.getCategoriesCompanies()
  }

  async getCategoriesCompanies() {
    await lastValueFrom(this.qtDataService.DatasOf(this.selectedCompanies[0].nomeAttivita)).then(data => {
      data.forEach(d => {
        if (!this.categories.includes(d.cat1))
          this.categories.push(d.cat1)
      })
      console.log('categoriessssssss: ', this.categories)
    })
  }

}
