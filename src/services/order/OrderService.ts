import * as Mongodb from 'mongodb';

import { Service, Inject } from 'mvc-ts';
import { Order, OrderGoods, GoodsModel } from '../../model';

@Service()
export class OrderService {
  @Inject()
  private order: Order;

  @Inject()
  private orderGoods: OrderGoods;

  @Inject()
  private goods: GoodsModel;

  public async createOrder(params: {
    goods: Mongodb.ObjectID[],
    owner: Mongodb.ObjectID,
    address: Mongodb.ObjectID,
  }): Promise<Order> {

  }
}