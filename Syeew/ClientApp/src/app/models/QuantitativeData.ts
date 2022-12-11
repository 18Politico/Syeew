import { ICompany } from "./interfaces/ICompany";
import { IQuantitativeData } from "./interfaces/IQuantitativeData";
import { TypeOfCompany } from "./TypeOfCompany";

export class QuantitativeData implements IQuantitativeData {

  idQuantitativeData!: string;

  idPointOfSale!: number;

  matriceNome!: string;

  //typeOfCompany: TypeOfCompany = -1;

  idCat!: number;

  serviceLabel!: string;

  //idx: string = "";

  date: any;

  net!: number;

  iva!: number;

  revenueWithIva!: number;

  qty!: number;

  worked!: number;

  //dim: number = -1;

  idCompany!: string;

  company!: ICompany;

}
