import * as Mongodb from 'mongodb';
import {Service, Inject} from 'mvc-ts';
import { GoodsStock } from '../../model/goods/Stock';

@Service()
export class GoodsStockService {
  @Inject()
  private stock: GoodsStock;

  /**
   * generate a new Stock
   *
   * @returns {Promise<GoodsStock>}
   * @memberof GoodsStockService
   */
  public async generateStock(): Promise<GoodsStock> {
    let stock: GoodsStock = this.stock.schema();

    let result = await this.stock.getCollection().insertOne(stock);
    stock._id = result.insertedId;

    return stock;
  }

  private async _modifyStock(_id: Mongodb.ObjectID, stock: GoodsStock): Promise<GoodsStock> {
    let result = await this.stock.getCollection().findOneAndUpdate({_id}, {$set: stock});

    return result.value;
  }

  /**
   * modify goods stock
   *
   * @param {Mongodb.ObjectID} _id
   * @param {*} stock
   * @returns {Promise<GoodsStock>}
   * @memberof GoodsStockService
   */
  public async modifyStock(_id: Mongodb.ObjectID, stock: any): Promise<GoodsStock> {
    let modifyValue: GoodsStock = this.stock.schema(stock);
    modifyValue.update_at = new Date;
    return await this._modifyStock(_id, stock);
  }
}