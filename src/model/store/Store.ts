import * as Mongodb from 'mongodb';
import { Model, Collection } from 'mvc-ts';
import * as SchemaObject from 'schema-object';
import { ModelSchema } from '../../decorator/ModelSchema';

export enum URL_TYPE {
  PRIVATE = 'PRIVATE',
  SYSTEM = 'SYSTEM'
}

export const StoreSchema = new SchemaObject({
  name: { type: String, required: true },
  brief_introduction: String,
  owner: { type: Object, required: true },
  url: { type: String, required: true },
  url_type: { type: String, enum: [URL_TYPE.PRIVATE, URL_TYPE.SYSTEM], required: true },
  description: String,
  address: Object,
  thumb_images: { type: Array, default: [] },
  create_at: { type: Date, default: (): Date => new Date() }
});

@Collection('store')
@Model()
@ModelSchema(StoreSchema)
export class Store {
  _id: Mongodb.ObjectID;
  name: string;
  brief_introduction: string;
  owner: Mongodb.ObjectID;
  url: string;
  url_type: URL_TYPE;
  description: string;
  address: Mongodb.ObjectID;
  thumb_images: Mongodb.ObjectID[];
  create_at: Date;

  public getCollection?(): Mongodb.Collection {}
  public schema?(schema: any): any {}
}