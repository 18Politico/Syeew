import { Dimention } from "../Dimention";
import { ManegementSystem } from "../ManegementSystem";
import { TypeOfCompany } from "../TypeOfCompany";
import { IQuantitativeData } from "./IQuantitativeData";

export interface ICompany{

  idCompany: string;

  companyName: string;

  businessName: string;

  typeOfCompany: TypeOfCompany;

  managementSystem: ManegementSystem;

  revenueDimention: Dimention;

  employeesDimention: Dimention;

  street: string;

  city: string

  proviceLabel: string;

  datas: IQuantitativeData[];

}
