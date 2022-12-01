import { TypeOfCompany } from "../TypeOfCompany";

export interface IQuantitativeData{

  idQuantitativeData: string;

  idMatrice: number;

  matriceNome: string;

  typeOfCompany: TypeOfCompany;

  idCat: number;

  cat1: string;

  idx: string;

  dt: any;

  net: number;

  iva: number;

  fattIvato: number;

  qta: number;

  lavorato: number;

  dim: number;

}
