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



}
