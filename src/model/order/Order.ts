import * as Mongodb from 'mongodb';
import * as SchemaObject from 'schema-object';

import {Collection, Model} from 'mvc-ts';
import { ModelSchema } from '../../decorator/ModelSchema';

export enum PAY_METHOD {
  ONLINE = 'ONLINE',  // online pay
  COD = 'COD'         // cash on delivery
}

export enum PAYMENT {
  ALIPAY = 'ALIPAY',
  WECHATPAY = 'WECHATPAY'
}

export enum ORDER_STATUS {
  SUBMIT = 'SUBMIT',
  DELIVERY = 'DELIVERY',
  SHIPPING = 'SHIPPING',
  COMPLETE = 'COMPLETE'
}

export const OrderSchema = new SchemaObject({
  products: [{goods: Object, nums: Number}],
  owner: Object,
  payer: Object,
  amount: new SchemaObject({
    method: {type: String, enum: [PAY_METHOD.ONLINE, PAY_METHOD.COD]},
    payment: {type: String, enum: [PAYMENT.ALIPAY, PAYMENT.WECHATPAY]},
    total_amount: Number,
    coupon: Number,
    discount: Number,
    pay_amount: Number,
  }),
  status: {type: String, enum: [ORDER_STATUS.SUBMIT, ORDER_STATUS.DELIVERY, ORDER_STATUS.SHIPPING, ORDER_STATUS.COMPLETE]},
  express: new SchemaObject({
    address: Object,
    company: String,
    amount: Number,
    tracking_number: String
  }),
  total_fee: Number,
  remark: String,
  create_at: Date,
  update_at: Date
});

@Collection('order')
@Model()
@ModelSchema()
export class Order {
  _id: Mongodb.ObjectID;
  products: {
    goods: Mongodb.ObjectID;
    nums: number;
  }[];
  owner: Mongodb.ObjectID;
  payer: Mongodb.ObjectID;
  amount: {
    method: PAY_METHOD;
    payment: PAYMENT,
    total_amount: number;
    coupon?: number;
    discount?: number;
    pay_amount: number; // pay_amount = total_amount - coupon - discount
  };
  status: ORDER_STATUS;
  express: {
    address: Mongodb.ObjectID;
    company: string;
    amount: number;
    tracking_number: string;
  };
  total_fee: number;  // total_fee = pay_amount + express.amount
  remark: string;
  create_at: Date;
  update_at: Date;
}