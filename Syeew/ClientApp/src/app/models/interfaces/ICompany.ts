import { Dimention } from "../Dimention";
import { ManegementSystem } from "../ManegementSystem";
import { TypeOfCompany } from "../TypeOfCompany";
import { IQuantitativeData } from "./IQuantitativeData";

export interface ICompany{

  ragioneSociale: string;

  nomeAttivita: string;

  tipoAttivita: string;

  gestionale: ManegementSystem;

  dimensioneFatturato: Dimention;

  dimensioneAddetti: Dimention;

  indirizzo: string;

  citta: string;

  provincia: string;

  datas: IQuantitativeData[];

}
