import * as Mongodb from 'mongodb';

import { Service, Inject } from 'mvc-ts';
import { Cart, CartItem } from '../../model';

@Service()
export class CartService {
  @Inject()
  private cart: Cart;

  /**
   * get user cart info
   *
   * @param {Mongodb.ObjectID} owner
   * @returns {Promise<Cart>}
   * @memberof CartService
   */
  public async getCart(owner: Mongodb.ObjectID): Promise<Cart> {
    let cart: Cart = await this.cart.getCollection().findOne({ owner });
    if (!cart) {
      cart = this.cart.schema({ owner });
      let result = await this.cart.getCollection().insertOne(cart);
      cart._id = result.insertedId;
    }
    return cart;
  }

  /**
   * add goods to cart
   *
   * @param {Mongodb.ObjectID} owner
   * @param {CartItem} item
   * @returns {Promise<Cart>}
   * @memberof CartService
   */
  public async addCart(owner: Mongodb.ObjectID, item: CartItem): Promise<Cart> {
    let cart = await this.getCart(owner);
    let products = cart.products;

    let exists = products.find(it => it.goods.equals(item.goods));
    if (exists) {
      exists.nums = item.nums;
    } else {
      item.add_at = new Date;
      products.push(item);
    }

    let result = await this.cart.getCollection().findOneAndUpdate({ owner }, {
      $set: { products }
    }, {
        upsert: false,
        returnOriginal: false
      });

    return result.value;
  }

  /**
   * remove goods from cart
   *
   * @param {Mongodb.ObjectID} owner
   * @param {Mongodb.ObjectID} goods
   * @returns {Promise<Cart>}
   * @memberof CartService
   */
  public async removeCart(owner: Mongodb.ObjectID, goods: Mongodb.ObjectID): Promise<Cart> {
    let result = await this.cart.getCollection().findOneAndUpdate({ owner }, {
      $pull: {
        products: { goods }
      }
    }, {
        upsert: false,
        returnOriginal: false
      });

    return result.value;
  }

  /**
   * clear user cart
   *
   * @param {Mongodb.ObjectID} owner
   * @returns {Promise<Cart>}
   * @memberof CartService
   */
  public async clearCart(owner: Mongodb.ObjectID): Promise<Cart> {
    let result = await this.cart.getCollection().findOneAndUpdate({ owner }, {
      $set: {
        products: []
      }
    }, {
        upsert: false,
        returnOriginal: false
      });

    return result.value;
  }
}