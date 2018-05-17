import * as Express from 'express';
import * as Mongodb from 'mongodb';

import {RestController, Req, QueryParam, Res, Post, Get, Put, Delete, Inject, PathParam} from 'mvc-ts';
import { GoodsService } from '../../services';
import { GoodsModel } from '../../model';

@RestController('/api/goods')
export class GoodsController {
  @Inject()
  private goodsService: GoodsService;

  @Post('/')
  public async createAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    let body = req.body;
    let goods = await this.goodsService.createGoods(body);

    res.sendJson(goods);
  }

  @Get('/')
  public async getListAction(@QueryParam('type') type: string, @QueryParam('last') last: string, @Res() res: Express.Response) {
    let _id = last ? Mongodb.ObjectID(last) : null;
    let list: GoodsModel[] = [];

    if (type) {
      type = Mongodb.ObjectID(type);
      list = await this.goodsService.getGoodsListByTypeAndId(type, _id);
    } else {
      list = await this.goodsService.getGoodsListById(_id);
    }

    let nextLast = list.length ? list[list.length - 1]['_id'] : '';
    res.sendJson({
      list,
      nums: list.length,
      last: nextLast
    });
  }

  @Put('/:goodsId')
  public async modifyAction(@PathParam('goodsId') goodsId: string, @Req() req: Express.Request, @Res() res: Express.Response) {
    let _id = Mongodb.ObjectID(goodsId);
    let modifyValue = req.body;

    let goods = await this.goodsService.modifyGoods(_id, modifyValue);

    res.sendJson(goods);
  }
}