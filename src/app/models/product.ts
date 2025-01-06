import { BaseEntity } from "./base-entity";
import { Color } from "./color";


export interface Product extends BaseEntity, Color {
    productId: number;
    productName: string;
    size: string; 
  }
  