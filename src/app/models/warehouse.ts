import { BaseEntity } from './base-entity';

export interface Warehouse extends BaseEntity {
  wareHouseId: number;
  productId: number;
  quantity: number;
  isReadyForSale: boolean;
}
