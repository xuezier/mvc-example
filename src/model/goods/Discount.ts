import * as Mongodb from 'mongodb';

import { Collection, Model } from 'mvc-ts';

export enum DiscountType {
  REDUCTION = 'REDUCTION',
  CUT_OFF = 'CUT_OFF',
}

export enum DiscountCondition {
  AMOUNT = 'AMOUNT',
  NUMBERS = 'NUMBERS'
}

export enum DiscountStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

@Collection('goods.discount')
@Model()
export class Discount {
  _id: Mongodb.ObjectID;
  type: DiscountType;
  condition: DiscountCondition;
  satisfied: number | string;
  status: DiscountStatus;
  start_at: Date;
  end_at: Date;
}