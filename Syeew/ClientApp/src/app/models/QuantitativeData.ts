import { IQuantitativeData } from "./interfaces/IQuantitativeData";
import { TypeOfCompany } from "./TypeOfCompany";

export class QuantitativeData implements IQuantitativeData {

  idQuantitativeData: string = "";

  idMatrice: number = -1;

  matriceNome: string = "";

  typeOfCompany: TypeOfCompany = -1;

  idCat: number = -1;

  cat1: string = "";

  idx: string = "";

  dt: any;

  net: number = -1;

  iva: number = -1;

  fattIvato: number = -1;

  qta: number = -1;

  lavorato: number = -1;

  dim: number = -1;

  // public get GetIdQuantitativeData() : string {
  //   return this.IdQuantitativeData;
  // }

  // public set SetIdQuantitativeData(v : string) {
  //   this.IdQuantitativeData = v;
  // }

  // public get GetIdMatrice() : number {
  //   return this.IdMatrice;
  // }

  // public set SetIdMatrice(v : number) {
  //   this.IdMatrice = v;
  // }

  // public get GetMatriceNome() : string {
  //   return this.MatriceNome;
  // }

  // public set SetMatriceNome(v : string) {
  //   this.MatriceNome = v;
  // }

}
