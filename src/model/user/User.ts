import * as Mongodb from 'mongodb';
import * as SchemaObject from 'schema-object';

import {Collection, Model} from 'mvc-ts';
import { ModelSchema } from '../../decorator/ModelSchema';

export enum Sex {
  F='F',
  M='M'
}

export const UserSchema = new SchemaObject({
  email: String,
  email_verified: Boolean,
  mobile: String,
  mobile_verified: Boolean,
  name: String,
  description: String,
  avatar: String,
  password: new SchemaObject({
    hash: String,
    salt: String,
  }),
  birthdate: Date,
  address: new SchemaObject({
      country: String,
      province: String,
      city: String,
      address: String,
      district: String,
  }),
  sex: {type: String, enum: ['M', 'F']},
  locale: String,
  timezone: String,
  activiated: Boolean,
  wechat: new SchemaObject({
    openid: String
  }),
  create_at: {type: Date, default: (): Date => new Date},
  last_login: new SchemaObject({
    type: String,
    time: Date,
  })
});

@Collection('user')
@Model()
@ModelSchema(UserSchema)
export class User {
  _id?: Mongodb.ObjectID;
  bound?: Mongodb.ObjectID;
  email?: string;
  email_verified?: boolean;
  mobile?: string;
  mobile_verified?: boolean;
  name?: string;
  description?: string;
  avatar?: string;
  password?: {
    hash: string;
    salt: string;
  };
  birthdate?: Date;
  address?: {
      country?: string;
      province?: string;
      city?: string;
      address?: string;
      district?: string;
  };
  sex?: string;
  locale?: string;
  timezone?: string;
  activiated?: boolean;
  create_at?: Date;
  wechat?: {
    openid?: string;
    unionid?: string;
  };
  last_login?: {
    type: string;
    time: Date;
  };

  public getCollection?(): Mongodb.Collection {}
  public schema?(schema: any): any {}
}
