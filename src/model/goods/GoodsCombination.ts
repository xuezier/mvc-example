import * as Mongodb from 'mongodb';

import {Model, Collection} from 'mvc-ts';

@Collection('goods.combination')
@Model()
export class GoodsCombinationModel {
  _id: Mongodb.ObjectID;
  name: string;
  remark: string;
  type: Mongodb.ObjectID;
  index_goods: Mongodb.ObjectID;
  create_at: Date;
}