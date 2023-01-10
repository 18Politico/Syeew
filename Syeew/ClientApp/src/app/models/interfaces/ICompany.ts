import { Dimention } from "../Dimention";
import { ManegementSystem } from "../ManegementSystem";
import { TypeOfCompany } from "../TypeOfCompany";
import { IQuantitativeData } from "./IQuantitativeData";

export interface ICompany{

  ragioneSociale: string;

  nomeAttività: string;

  tipoAttività: string;

  gestionale: ManegementSystem;

  dimensioneFatturato: Dimention;

  dimensioneAddetti: Dimention;

  indirizzo: string;

  città: string;

  provincia: string;

  datas: IQuantitativeData[];

}
