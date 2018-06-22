import * as Mongodb from 'mongodb';

import { Model, Collection } from 'mvc-ts';

@Collection('user.coupon')
@Model()
export class UserCoupon {
  _id: Mongodb.ObjectID;
  user: Mongodb.ObjectID;
  coupon: Mongodb.ObjectID;
  create_at: Date;
  use_at: Date;
}