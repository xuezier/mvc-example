import * as Express from 'express';
import * as Mongodb from 'mongodb';

import {RestController, Put, BodyParam, Req, Res, Inject, PathParam} from 'mvc-ts';
import { GoodsService, GoodsStockService } from '../../services';
import { DefinedError } from '../../model/DefinedError';

@RestController('/api/goods/stock')
export class StockController {
  @Inject()
  private goodsService: GoodsService;

  @Inject()
  private stockService: GoodsStockService;

  @Put('/:goodsId')
  public async modifyAction(@PathParam('stockId') stockId: string, @Req() req: Express.Request, @Res() res: Express.Response) {
    let _id = Mongodb.ObjectID(stockId);
    let modifyValue = req.body;

    let goods = await this.goodsService.findGoodsById(_id);

    if (!goods) {
      throw new DefinedError(400, 'goods_not_found');
    }

    let stock = await this.stockService.modifyStock(goods.stock, modifyValue);

    res.sendJson(stock);
  }
}