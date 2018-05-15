import * as Mongodb from 'mongodb';
import * as SchemaObject from 'schema-object';

import {Model, Collection} from 'mvc-ts';

@Collection('goods.stock')
@Model()
export class GoodsStock {
  _id: Mongodb.ObjectID;
  name: string;

}