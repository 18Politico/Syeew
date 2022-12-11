import { TypeOfCompany } from "../TypeOfCompany";
import { ICompany } from "./ICompany";

export interface IQuantitativeData{

  idQuantitativeData: string;

  idPointOfSale: number;

  matriceNome: string; //DA SISTEMARE ANCHE SU COMPONENTE

  //typeOfCompany: TypeOfCompany;

  idCat: number;

  serviceLabel: string;

  //idx: string;

  date: Date;

  net: number;

  iva: number;

  revenueWithIva: number;

  qty: number;

  worked: boolean;

  //dim: number;

  idCompany: string;

  company: ICompany;

}
