import * as Mongodb from 'mongodb';
import { Model, Collection } from 'mvc-ts';
import * as SchemaObject from 'schema-object';
import { ModelSchema } from '../../decorator/ModelSchema';

export enum ManagerLevel {
  shopowner = 'shopowner',
  salesperson = 'salesperson',
  salesman = 'salesman'
}

export const ManagerSchame = new SchemaObject({
  user: Object,
  create_at: { type: Date, default: () => new Date },
  level: { type: String, default: ManagerLevel.shopowner }
});

@Collection('manage.manager')
@Model()
@ModelSchema(ManagerSchame)
export class Manager {
  _id: Mongodb.ObjectID;
  user: Mongodb.ObjectID;
  create_at: Date;
  level: ManagerLevel;
}

export enum ManagerBindCodeStatus {
  PADDING = 'PADDING',
  USED = 'USED',
  DISABLED = 'DISABLED'
}

export const ManagerBindCodeSchame = new SchemaObject({
  user: Object,
  code: String,
  create_at: { type: Date, default: () => new Date }
});

@Collection('manage.manager.bind_code')
@Model()
@ModelSchema(ManagerBindCodeSchame)
export class ManagerBindCode {
  _id: Mongodb.ObjectID;
  user: Mongodb.ObjectID;
  code: string;
  status: ManagerBindCodeStatus;
  create_at: Date;
}