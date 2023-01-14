import { ICompany } from "./interfaces/ICompany";
import { IQuantitativeData } from "./interfaces/IQuantitativeData";
import { TypeOfCompany } from "./TypeOfCompany";

export class QuantitativeData implements IQuantitativeData {

  idMatrice!: number;
  matriceNome!: string;
  idTipoDiAttivita!: string;
  idCat!: number;
  cat1!: string;
  idx!: string;
  dt!: Date;
  netto!: number;
  iva!: number;
  fattIvato!: number;
  qta!: number;
  lavorato!: boolean;
  dim!: number;
  id!: number;
  company!: ICompany;

  constructor(){
    this.idMatrice = -1
    this.matriceNome = ""
    this.idTipoDiAttivita = ""
    this.idCat = -1
    this.cat1 = ""
    this.idx = ""
    this.dt = new Date();
    this.netto = -1
    this.iva = -1
    this.fattIvato = -1
    this.qta = -1
    this.lavorato = false
    this.dim = -1
    this.id = -1
  }

}
