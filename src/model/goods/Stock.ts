import * as Mongodb from 'mongodb';
import * as SchemaObject from 'schema-object';

import {Model, Collection} from 'mvc-ts';
import { ModelSchema } from '../../decorator/ModelSchema';
import { BaseModel } from '../BaseModel';

export const GoodsStockSchema = new SchemaObject({
  name: String,
  stock: {type: Number, default: 0},
  create_at: Date,
  update_at: Date
});
@Collection('goods.stock')
@Model()
@ModelSchema(GoodsStockSchema)
export class GoodsStock extends BaseModel {
  _id: Mongodb.ObjectID;
  name: string;
  stock: number;
  create_at: Date;
  update_at: Date;
}