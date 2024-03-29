import { Dimention } from "./Dimention";
import { ICompany } from "./interfaces/ICompany";
import { IQuantitativeData } from "./interfaces/IQuantitativeData";
import { ManegementSystem } from "./ManegementSystem";
import { TypeOfCompany } from "./TypeOfCompany";

export class Company implements ICompany{

  ragioneSociale!: string;
  nomeAttivita!: string;
  tipoAttivita!: string;
  gestionale!: string;
  dimensioneFatturato!: string;
  dimensioneAddetti!: string;
  indirizzo!: string;
  citta!: string;
  provincia!: string;
  datas!: IQuantitativeData[];

}
