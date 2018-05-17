import * as Mongodb from 'mongodb';

import { Service, Inject } from 'mvc-ts';
import { Cart, CartItem } from '../../model';

@Service()
export class CartService {
  @Inject()
  private cart: Cart;

  public async getCart(owner: Mongodb.ObjectID): Promise<Cart> {
    let cart: Cart = await this.cart.getCollection().findOne({ owner });
    return cart;
  }

  public async addCart(owner: Mongodb.ObjectID, item: CartItem): Promise<Mongodb.ObjectID> {
    let goods = item.goods;
  }

  public async removeCart(owner: Mongodb.ObjectID, goods: Mongodb.ObjectID): Promise<Mongodb.ObjectID> {

  }
}