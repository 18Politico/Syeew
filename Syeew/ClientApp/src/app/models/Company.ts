import { Dimention } from "./Dimention";
import { ICompany } from "./interfaces/ICompany";
import { IQuantitativeData } from "./interfaces/IQuantitativeData";
import { ManegementSystem } from "./ManegementSystem";
import { TypeOfCompany } from "./TypeOfCompany";

export class Company implements ICompany{

  idCompany!: string;
  companyName!: string;
  businessName!: string;
  typeOfCompany!: TypeOfCompany;
  managementSystem!: ManegementSystem;
  revenueDimention!: Dimention;
  employeesDimention!: Dimention;
  street!: string;
  city!: string;
  proviceLabel!: string;
  datas!: IQuantitativeData[];

}
