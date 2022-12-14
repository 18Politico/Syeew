import { Dimention } from "../Dimention";
import { ManegementSystem } from "../ManegementSystem";
import { TypeOfCompany } from "../TypeOfCompany";
import { IQuantitativeData } from "./IQuantitativeData";

export interface ICompany{

  ragioneSociale: string;

  nomeAttivitÃ : string;

  tipoAttivitÃ : string;

  gestionale: ManegementSystem;

  dimensioneFatturato: Dimention;

  dimensioneAddetti: Dimention;

  indirizzo: string;

  cittÃ : string;

  provincia: string;

  datas: IQuantitativeData[];

}
