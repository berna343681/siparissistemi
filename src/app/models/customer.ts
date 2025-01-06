import { BaseEntity } from "./base-entity";


export interface Customer extends BaseEntity {

  customerId: number;
  name: string;
  address: string;
  phoneNo: string;
  email: string;
}
