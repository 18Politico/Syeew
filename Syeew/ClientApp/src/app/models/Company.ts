import { Dimention } from "./Dimention";
import { ICompany } from "./interfaces/ICompany";
import { IQuantitativeData } from "./interfaces/IQuantitativeData";
import { ManegementSystem } from "./ManegementSystem";
import { TypeOfCompany } from "./TypeOfCompany";

export class Company implements ICompany{

  ragioneSociale!: string;
  nomeAttivitÃ !: string;
  tipoAttivitÃ !: string;
  gestionale!: ManegementSystem;
  dimensioneFatturato!: Dimention;
  dimensioneAddetti!: Dimention;
  indirizzo!: string;
  cittÃ !: string;
  provincia!: string;
  datas!: IQuantitativeData[];

}
