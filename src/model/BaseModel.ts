import * as Mongodb from 'mongodb';

export class BaseModel {
  public getCollection(): Mongodb.Collection {}
  public schema(info?: any): any {}
}