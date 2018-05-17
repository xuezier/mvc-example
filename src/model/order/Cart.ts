import * as Mongodb from 'mongodb';
import * as SchemaObject from 'schema-object';

import {Model, Collection} from 'mvc-ts';

export class CartItem {
  goods: Mongodb.ObjectID;
  nums: Number;
  add_at: Date;
}

@Collection('cart')
@Model()
export class Cart {
  _id: Mongodb.ObjectID;
  owner: Mongodb.ObjectID;
  products: CartItem[];
}