import { BaseEntity } from "./base-entity";

export interface Color extends BaseEntity{
    colorId: number;
    name: string;
}
