import * as Mongodb from 'mongodb';

import { Service, Inject } from 'mvc-ts';
import { GoodsModel } from '../../model';
import { GoodsStockService } from './GoodsStockService';
import { CounterService } from '..';

@Service()
export class GoodsService {
  @Inject()
  private goods: GoodsModel;

  @Inject()
  private stockService: GoodsStockService;

  @Inject()
  private counterService: CounterService;

  /**
   * find goods by goods _id
   *
   * @param {Mongodb.ObjectID} _id
   * @returns {(Promise<GoodsModel|null>)}
   * @memberof GoodsService
   */
  public async findGoodsById(_id: Mongodb.ObjectID): Promise<GoodsModel | null> {
    return await this.goods.getCollection().findOne({ _id });
  }

  private async _getList(query: any, limit: number): Promise<GoodsModel[]> {
    return await this.goods.getCollection().find(query)
      .sort({ _id: 1 })
      .limit(limit)
      .toArray();
  }

  private async _getListByPage(query: any, page: number, limit: number): Promise<GoodsModel[]> {
    return await this.goods.getCollection().find(query)
      .skip(page * limit)
      .limit(limit)
      .toArray();
  }

  /**
   * @description get goods list by page
   * @author Xuezi
   * @param {number} [page=0]
   * @param {number} [pagesize=10]
   * @returns {Promise<GoodsModel[]>}
   * @memberof GoodsService
   */
  public async getGoodsListByPage(page: number = 0, pagesize: number = 10): Promise<GoodsModel[]> {
    return await this._getListByPage({}, page, pagesize);
  }

  /**
   * @description
   * @author Xuezi
   * @param {Mongodb.ObjectID} type
   * @param {number} [page=0]
   * @param {number} [pagesize=10]
   * @returns {Promise<GoodsModel[]>}
   * @memberof GoodsService
   */
  public async getGoodsListByPageAndType(type: Mongodb.ObjectID, page: number = 0, pagesize: number = 10): Promise<GoodsModel[]> {
    return await this._getListByPage({ type }, page, pagesize);
  }

  /**
   * get goods list by last goods _id
   *
   * @param {Mongodb.ObjectID} [_id]
   * @returns {Promise<GoodsModel[]>}
   * @memberof GoodsService
   */
  public async getGoodsListById(_id?: Mongodb.ObjectID, pagesize: number = 10): Promise<GoodsModel[]> {
    let query = _id ? { _id: { $gt: _id } } : {};

    let list: GoodsModel[] = await this._getList(query, pagesize);
    return list;
  }

  /**
   * @description get goods counter
   * @author Xuezi
   * @returns {Promise<number>}
   * @memberof GoodsService
   */
  public async getGoodsCounter(): Promise<number> {
    return await this.goods.getCollection().count({});
  }

  /**
   * @description get goods counter by goods type
   * @author Xuezi
   * @param {Mongodb.ObjectID} type
   * @returns {Promise<number>}
   * @memberof GoodsService
   */
  public async getGoodsCounterByType(type: Mongodb.ObjectID): Promise<number> {
    return await this.goods.getCollection().count({ type });
  }

  public async getGoodsListByTypeAndId(type: Mongodb.ObjectID, _id?: Mongodb.ObjectID, pagesize?: number = 10): Promise<GoodsModel[]> {
    let query = { type };
    if (_id) {
      query['_id'] = { $gt: _id };
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
    let { thumb_images = [] } = goods;
    thumb_images = thumb_images.map(image => Mongodb.ObjectID(image));
    goods.thumb_images = thumb_images;

    let insertValue: GoodsModel = this.goods.schema(goods);

    let stock = await this.stockService.generateStock();
    let id = await this.counterService.getNextGoodsId();

    insertValue.stock = stock._id;
    insertValue.id = id;

    let result = await this.goods.getCollection().insertOne(insertValue);
    insertValue._id = result.insertedId;

    return insertValue;
  }

  private async _modifyGoods(_id: Mongodb.ObjectID, goods: GoodsModel): Promise<GoodsModel> {
    let result = await this.goods.getCollection().findOneAndUpdate({ _id }, { $set: goods }, {
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