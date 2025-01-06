 import { BaseEntity } from "./base-entity";

export interface Order extends BaseEntity {
    orderId: number;
    customerId: number;
    productId: number;
    quantity: number;
}
