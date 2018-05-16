import * as Mongodb from 'mongodb';

import {Service, Inject} from 'mvc-ts';
import { GoodsModel } from '../../model';
import { GoodsStockService } from './GoodsStockService';

@Service()
export class GoodsService {
  @Inject()
  private goods: GoodsModel;

  @Inject()
  private stockService: GoodsStockService;

  /**
   * find goods by goods _id
   *
   * @param {Mongodb.ObjectID} _id
   * @returns {(Promise<GoodsModel|null>)}
   * @memberof GoodsService
   */
  public async findGoodsById(_id: Mongodb.ObjectID): Promise<GoodsModel|null> {
    return await this.goods.getCollection().findOne({_id});
  }

  private async _getList(query: any, limit: number): Promise<GoodsModel[]> {
    return await this.goods.getCollection().find(query)
      .sort({_id: 1})
      .limit(limit)
      .toArray();
  }

  /**
   * get goods list by last goods _id
   *
   * @param {Mongodb.ObjectID} [_id]
   * @returns {Promise<GoodsModel[]>}
   * @memberof GoodsService
   */
  public async getGoodsListById(_id?: Mongodb.ObjectID, pagesize: number = 20): Promise<GoodsModel[]> {
    let query = _id ? {_id: {$gt: _id}} : {};

    let list: GoodsModel[] = await this._getList(query, pagesize);
    return list;
  }

  public async getGoodsListByTypeAndId(type: Mongodb.ObjectID, _id?: Mongodb.ObjectID, pagesize: number = 20): Promise<GoodsModel[]> {
    let query = {type};
    if (_id) {
      query['_id'] = {$gt: _id};
    }

    let list = await this._getList(query, pagesize);
    return list;
  }

  /**
   * create a new goods
   *
   * @param {GoodsModel} goods
   * @returns {Promise<GoodsModel>}
   * @memberof GoodsService
   */
  public async createGoods(goods: GoodsModel): Promise<GoodsModel> {
    let insertValue: GoodsModel = this.goods.schema(goods);
    let stock = await this.stockService.generateStock();
    insertValue.stock = stock._id;

    let result = await this.goods.getCollection().insertOne(insertValue);
    insertValue._id = result.insertedId;

    return insertValue;
  }

  private async _modifyGoods(_id: Mongodb.ObjectID, goods: GoodsModel): Promise<GoodsModel> {
    let result = await this.goods.getCollection().findOneAndUpdate({_id}, {$set: goods}, {
      upsert: false,
      returnOriginal: false
    });

    return result.value;
  }

  /**
   * modify goods
   *
   * @param {Mongodb.ObjectID} _id
   * @param {GoodsModel} goods
   * @returns {Promise<GoodsModel>}
   * @memberof GoodsService
   */
  public async modifyGoods(_id: Mongodb.ObjectID, goods: GoodsModel): Promise<GoodsModel> {
    return await this._modifyGoods(_id, goods);
  }
}