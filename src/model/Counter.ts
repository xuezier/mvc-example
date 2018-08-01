import * as Mongodb from 'mongodb';

import {Collection, Model} from 'mvc-ts';

@Collection('counter')
@Model()
export class Counter {
  _id: Mongodb.ObjectID;
  name: string;
  sequence_value: number;

  public getCollection?(): any {}
}