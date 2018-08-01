import * as Mongodb from 'mongodb';
import { Collection, Model } from 'mvc-ts';
import * as SchemaObject from 'schema-object';
import { ModelSchema } from '../../decorator/ModelSchema';


export const StoreAddressSchema = new SchemaObject({
  address: new SchemaObject({
    longitude: Number,
    latitude: Number,
    state: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    county: { type: String, required: true },
    town: { type: String, required: true },
    street: { type: String, required: true },
    mark: String
  }),
  mobile: String,
  telephone: String,
  email: String,
  contact: String,
  update_at: { type: Date, default: (): Date => new Date() },
  create_at: { type: Date, default: (): Date => new Date() }
});

@Collection('store.address')
@Model()
@ModelSchema(StoreAddressSchema)
export class StoreAddress {
  _id: Mongodb.ObjectID;
  address: {
    longitude: number;
    latitude: number;
    state: string;
    province: string;
    city: string;
    county: string;
    town: string;
    street: string;
    mark: string;
  };

  mobile: string;
  telephone: string;
  email: string;
  contact: string;
  create_at: Date;

  public getCollection?(): Mongodb.Collection {}
  public schema?(schema: any): any {}
}