import * as Mongodb from 'mongodb';

import { Model, Collection } from 'mvc-ts';

@Collection('order.goods')
@Model()
export class OrderGoods {
  _id: Mongodb.ObjectID;
  prototype: Mongodb.ObjectID;
  name: { type: String, required: true };
  description: { type: Object, preserveNull: true };
  thumb_images: Mongodb.ObjectID[];

  public getCollection(): Mongodb.Collection { }
}