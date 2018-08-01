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
  user: { type: Object, required: true },
  store: { type: Object, required: true },
  create_at: { type: Date, default: () => new Date },
  level: { type: String, default: ManagerLevel.shopowner }
});

@Collection('manage.manager')
@Model()
@ModelSchema(ManagerSchame)
export class Manager {
  _id: Mongodb.ObjectID;
  user: Mongodb.ObjectID;
  store: Mongodb.ObjectID;
  create_at: Date;
  level: ManagerLevel;

  public getCollection?(): any {}
  public schema?(schema: any): any {}
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
  _id?: Mongodb.ObjectID;
  user?: Mongodb.ObjectID;
  store?: Mongodb.ObjectID;
  level?: ManagerLevel;
  code?: string;
  status?: ManagerBindCodeStatus;
  create_at?: Date;

  public getCollection?(): Mongodb.Collection {}
  public schema?(schema: any): any {}
}