import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ICompany } from 'src/app/models/interfaces/ICompany';
import { IndexedCompany } from 'src/app/models/interfaces/IndexedCompany'
import { IQuantitativeData } from 'src/app/models/interfaces/IQuantitativeData';
import { CompaniesService } from 'src/app/services/companies.service';

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-multi-companies-table',
  templateUrl: './multi-companies-table.component.html',
  styleUrls: ['./multi-companies-table.component.css']
})
export class MultiCompaniesTable {
  // selector
  @ViewChild('activitySelector') activitySelector!: MatSelect

  // selection options
  activityOptions!: string[]

  // All companies retrieved from the db
  companies: IndexedCompany[];

  // table fields
  displayedColumns: string[]
  dataSource: MatTableDataSource<IndexedCompany>
  selection: SelectionModel<IndexedCompany>

  // filtering fields
  activityNameFilter: string
  activityTypeFilter: string
  cityFilter: string
  provinceFilter: string

  // spinner
  isLoading!: boolean
  vediDash: boolean = false;

  // dates
  dateFrom = new FormControl('', [Validators.required]);
  dateUntil = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private _serviceCmp: CompaniesService) {
    this.isLoading = true
    this.activityNameFilter = ''
    this.activityTypeFilter = ''
    this.cityFilter = ''
    this.provinceFilter = ''
    this.companies = []
    this.dataSource = new MatTableDataSource()
    this.selection = new SelectionModel<IndexedCompany>(true, [])
    this.displayedColumns = [
      'select',
      'nomeAttivita',
      'tipoAttivita',
      'gestionale',
      'dimensioneFatturato',
      'dimensioneAddetti',
      'indirizzo',
      'citta',
      'provincia']
    this._serviceCmp.getCompanies()
      .subscribe(companies => {
        this.initICompanyFields(companies)
        this.activityOptions = this._serviceCmp.getActivityTypes(companies)
        this.companies = companies as IndexedCompany[]
        this.companies.forEach((element, index) => element.position = index)
        this.dataSource = new MatTableDataSource<IndexedCompany>(this.companies)
        this.dataSource.filterPredicate = (data: IndexedCompany, filter: string) => data.nomeAttivita.trim().toLocaleLowerCase().indexOf(filter) != -1;
        this.isLoading = false  // stop the spinner
      })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }



  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IndexedCompany): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /**
   * Gets all selected companies
   */
  getSelectedCompanies(): ICompany[] {
    return this.selection.selected as ICompany[]
  }

  applyFilter() {
    this.dataSource.data = this.companies
      .filter(
        x => {
          return x.nomeAttivita.trim().toLocaleLowerCase().includes(this.activityNameFilter.trim().toLocaleLowerCase()) &&
            x.tipoAttivita.trim().toLocaleLowerCase().includes(this.activitySelector.value.trim().toLocaleLowerCase()) &&
            x.citta.trim().toLocaleLowerCase().includes(this.cityFilter.trim().toLocaleLowerCase()) &&
            x.provincia.trim().toLocaleLowerCase().includes(this.provinceFilter.trim().toLocaleLowerCase())
        }
      )
  }

  /**
   * this function is called after an activity is selected from the selector
   */
  activitySelected() {
    this.dataSource.data = this.companies.filter(c => c.tipoAttivita.trim().toLocaleLowerCase().includes(this.activitySelector.value.trim().toLocaleLowerCase()))
    this.selection.clear()
    this.activityNameFilter = ''
    this.activityTypeFilter = ''
    this.cityFilter = ''
    this.provinceFilter = ''
  }


  /**
   * Initialize fields of Icompany if it is null, this is needed to avoid null pointer errors
   */
  private initICompanyFields(companies: ICompany[]) {
    companies.forEach(c => {
      if (c.nomeAttivita === null)
        c.nomeAttivita = ''
      if (c.tipoAttivita === null)
        c.tipoAttivita = ''
      if (c.citta === null)
        c.citta = ''
      if (c.provincia === null)
        c.provincia = ''
    })
  }

  // dashboard button generation and reset
  vediDashFunc() {
    this.vediDash = true;
    setTimeout(() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" }));
  }

  resetDashboard() {
    this.vediDash = false
    this.dateFrom = new FormControl('', [Validators.required]);
    this.dateUntil = new FormControl('', [Validators.required]);

  }

}

// dates checking
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
