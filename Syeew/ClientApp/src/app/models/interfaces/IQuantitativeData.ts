import { TypeOfCompany } from "../TypeOfCompany";

export interface IQuantitativeData{

  IdQuantitativeData: string;

  IdMatrice: number;

  MatriceNome: string;

  TypeOfCompany: TypeOfCompany;

  IdCat: number;

  Cat1: string;

  Idx: string;

  Dt: any;

  Netto: number;

  Iva: number;

  FattIvato: number;

  Qta: number;

  Lavorato: number;

  Dim: number;

}
