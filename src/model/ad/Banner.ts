import * as Mongodb from 'mongodb';

import {Model, Collection} from 'mvc-ts';
import * as SchemaObject from 'schema-object';

import { BaseModel } from '../BaseModel';
import { ModelSchema } from '../../decorator/ModelSchema';

export const BannerSchema = new SchemaObject({
  description: String,
  image: {type: Object, required: true},
  link: string,
  create_at: {type: Date, default: (): Date => new Date}
});


@Collection('ad.banner')
@Model()
@ModelSchema(BannerSchema)
export class Banner extends BaseModel {
  _id: Mongodb.ObjectID;
  description: string;
  image: Mongodb.ObjectID;
  link: string;
  create_at: Date;
}