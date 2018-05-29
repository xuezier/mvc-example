import * as Mongodb from 'mongodb';

import { Service, Inject } from 'mvc-ts';
import { GoodsModel, Discount, DiscountStatus } from '../../model';
import { DefinedError } from '../../model/DefinedError';

@Service()
export class DiscountService {
  @Inject()
  private goods: GoodsModel;

  @Inject()
  private discount: Discount;

  /**
   * create a new goods discount
   *
   * @param {Discount} info
   * @returns {Promise<Discount>}
   * @memberof DiscountService
   */
  public async createDiscount(info: Discount): Promise<Discount> {
    let result = await this.discount.getCollection().insertOne(info);
    info._id = result.insertedId;

    return info;
  }

  /**
   * find ad discount by id
   *
   * @param {Mongodb.ObjectID} _id
   * @returns {Primise<Discount>}
   * @memberof DiscountService
   */
  public async findDiscountById(_id: Mongodb.ObjectID): Promise<Discount> {
    let discount: Discount = await this.discount.getCollection().findOne({ _id });
    return discount;
  }

  /**
   * add or replace a discount to goods.
   *
   * @param {Mongodb.ObjectID} discount
   * @param {Mongodb.ObjectID} goods
   * @returns {Promise<GoodsModel>}
   * @memberof DiscountService
   */
  public async addDiscountToGoods(discount: Mongodb.ObjectID, goods: Mongodb.ObjectID): Promise<GoodsModel> {
    let discount = await this.findDiscountById(discount);

    if (!discount) {
      throw new DefinedError(400, 'not_fount_discount');
    }

    let result = await this.goods.getCollection().findOneAndUpdate({ _id: goods }, {
      $set: { discount }
    }, {
        upsert: false,
        returnOriginal: false
      });

    return result.value;
  }

  /**
   * remove goods discount
   *
   * @param {Mongodb.ObjectID} goods
   * @returns {Promise<GoodsModel>}
   * @memberof DiscountService
   */
  public async removeDiscountFromGoods(goods: Mongodb.ObjectID): Promise<GoodsModel> {
    let result = await this.goods.getCollection().findOneAndUpdate({ _id: goods }, {
      $set: {
        discount: ''
      }
    }, {
        upsert: false,
        returnOriginal: false
      });

    return result.value;
  }

  /**
   * private method to update discount document
   *
   * @private
   * @param {Mongodb.ObjectID} _id
   * @param {Discount} data
   * @returns {Promise<Discount>}
   * @memberof DiscountService
   */
  private async _updateDiscount(_id: Mongodb.ObjectID, data: Discount): Promise<Discount> {
    let result = await this.discount.getCollection().findOneAndUpdate({ _id }, {
      $set: data
    }, {
        upsert: false,
        returnOriginal: false
      });

    return result.value;
  }

  /**
   * disable a discount
   *
   * @param {Mongodb.ObjectID} _id
   * @returns {Promise<Discount>}
   * @memberof DiscountService
   */
  public async disableDiscount(_id: Mongodb.ObjectID): Promise<Discount> {
    let discount = await this._updateDiscount(_id, { status: DiscountStatus.DISABLED });

    return discount;
  }

  /**
   * enable a discount
   *
   * @param {Mongodb.ObjectID} _id
   * @returns {Promise<Discount>}
   * @memberof DiscountService
   */
  public async enableDiscount(_id: Mongodb.ObjectID): Promise<Discount> {
    let discount = await this._updateDiscount(_id, { status: DiscountStatus.ENABLED });
    return discount;
  }
}