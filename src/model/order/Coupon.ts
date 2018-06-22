import * as Mongodb from 'mongodb';

import { Model, Collection } from 'mvc-ts';

export enum CouponRangeType {
  ALL = 'ALL',
  TYPE = 'TYPE',
  PRODUCT = 'PRODUCT'
}

export enum CouponCondition {
  AMOUNT = 'AMOUNT',
  NUMBERS = 'NUMBERS'
}

export enum CouponType {
  REDUCTION = 'REDUCTION',
  CUT_OFF = 'CUT_OFF'
}

export enum CouponStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

@Collection('order.coupon')
@Model()
export class Coupon {
  _id: Mongodb.ObjectID;
  title: string;
  range_type: CouponRangeType;
  range?: string | string[];
  type: CouponType;
  condition: CouponCondition;
  satisfied: number | string;
  status: CouponStatus;
  stock: number;
  create_at: Date;
  start_at: Date;
  end_at: Date;
}