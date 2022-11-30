import { IQuantitativeData } from "./interfaces/IQuantitativeData";
import { TypeOfCompany } from "./TypeOfCompany";

export class QuantitativeData implements IQuantitativeData {

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


  constructor(idQuantitativeData: string,
              idMatrice: number,
              matriceNome: string,
              typeOfCompany: TypeOfCompany,
              idCat: number,
              cat1: string,
              idx: string,
              dt: Date,
              netto: number,
              iva: number,
              fattIvato: number,
              qta: number,
              lavorato: number,
              dim: number)
  {
    this.IdQuantitativeData = idQuantitativeData;
    this.IdMatrice = idMatrice;
    this.MatriceNome = matriceNome;
    this.TypeOfCompany = typeOfCompany;
    this.IdCat = idCat;
    this.Cat1 = cat1;
    this.Idx = idx;
    this.Dt = dt;
    this.Netto = netto;
    this.Iva = iva;
    this.FattIvato = fattIvato;
    this.Qta = qta;
    this.Lavorato = lavorato;
    this.Dim = dim;
  }

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
