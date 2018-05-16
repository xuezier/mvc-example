import * as Mongodb from 'mongodb';
import * as SchemaObject from 'schema-object';

import {Model, Collection} from 'mvc-ts';

import {ModelSchema} from '../../decorator/ModelSchema';

export const GoodsSchema = new SchemaObject({
  name: {type: String, required: true},
  creator: {type: Object},
  type: {type: Object, preserveNull: true},
  tags: {type: Array, default: []},
  description: {type: Object, preserveNull: true},
  thumb_images: {type: Array, default: []},
  combination: {type: Array, default: []},
  stock: {type: Object},
  create_at: {type: Date, default: (): Date => new Date},
  update_at: {type: Date, preserveNull: true}
});

@Collection('goods')
@Model()
@ModelSchema(GoodsSchema)
export class GoodsModel {
  _id: Mongodb.ObjectID;
  name: string;
  type: Mongodb.ObjectID;
  tags: Mongodb.ObjectID[];
  description: Mongodb.ObjectID;
  thumb_images: Mongodb.ObjectID[];
  combination: Mongodb.ObjectID[];
  stock: Mongodb.ObjectID;
  create_at: Date;
  update_at: Date;

  public getCollection(): Mongodb.Collection {}
  public schema(info: any): any {}
}