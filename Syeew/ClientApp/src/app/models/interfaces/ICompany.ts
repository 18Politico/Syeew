import { Dimention } from "../Dimention";
import { ManegementSystem } from "../ManegementSystem";
import { TypeOfCompany } from "../TypeOfCompany";
import { IQuantitativeData } from "./IQuantitativeData";

export interface ICompany{

  ragioneSociale: string;

  nomeAttivita: string;

  tipoAttivita: string;

  gestionale: string;

  dimensioneFatturato: string;

  dimensioneAddetti: string;

  indirizzo: string;

  citta: string;

  provincia: string;

  datas: IQuantitativeData[];

}
