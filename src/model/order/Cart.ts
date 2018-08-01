import * as Mongodb from 'mongodb';
import * as SchemaObject from 'schema-object';

import { Model, Collection } from 'mvc-ts';
import { ModelSchema } from '../../decorator/ModelSchema';

export class CartItem {
  goods: Mongodb.ObjectID;
  nums: Number;
  add_at?: Date;
}

export const CartSchema = new SchemaObject({
  owner: Object,
  products: { type: Array, default: [] }
});

@Collection('cart')
@Model()
@ModelSchema(CartSchema)
export class Cart {
  _id: Mongodb.ObjectID;
  owner: Mongodb.ObjectID;
  products: CartItem[];

  public getCollection?(): Mongodb.Collection {}
  public schema?(schema: any): any {}
}