import { TypeOfCompany } from "../TypeOfCompany";
import { ICompany } from "./ICompany";

export interface IQuantitativeData{

  idMatrice: number;

  matriceNome: string;

  idTipoDiAttività: string;

  idCat: number;

  cat1: string;

  idx: string;

  dt: Date;

  netto: number;

  iva: number;

  fattIvato: number;

  qta: number;

  lavorato: boolean;

  dim: number;

  id: number;

  company: ICompany;

}
