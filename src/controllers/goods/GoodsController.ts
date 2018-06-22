import * as Express from 'express';
import * as Mongodb from 'mongodb';

import { RestController, Req, QueryParam, Res, Post, Get, Put, Delete, Inject, PathParam } from 'mvc-ts';
import { GoodsService } from '../../services';
import { GoodsModel, User } from '../../model';

@RestController('/api/goods')
export class GoodsController {
  @Inject()
  private goodsService: GoodsService;

  @Post('/')
  public async createAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    let body: GoodsModel = req.body;
    let user: User = req.user;

    body.creator = user._id;
    let goods = await this.goodsService.createGoods(body);

    res.sendJson(goods);
  }

  @Get('/')
  public async getListAction(@QueryParam('type') type: string, @QueryParam('last') last: string, @QueryParam('page') page: number, @Res() res: Express.Response) {
    let _id = last ? Mongodb.ObjectID(last) : null;
    let list: GoodsModel[] = [];
    console.log(page, typeof page);
    if (!isNaN(page)) {
      if (type) {
        type = Mongodb.ObjectID(type);
        list = await this.goodsService.getGoodsListByPageAndType(type, page);
      } else {
        list = await this.goodsService.getGoodsListByPage(page);
      }

      res.sendJson({
        page,
        list,
        nums: list.length
      });
    } else {
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
  }

  @Get('/counter')
  public async getCounterAction(@Res() res: Express.Response) {
    let counter = await this.goodsService.getGoodsCounter();

    res.sendJson({ counter });
  }

  @Get('/counter/type/:type')
  public async getGounterByTypeAction(@PathParam('type') type: string, @Res() res: Express.Response) {
    type = Mongodb.ObjectID(type);

    let counter = await this.goodsService.getGoodsCounterByType(type);

    res.sendJson({ counter });
  }

  @Put('/update/:goodsId')
  public async modifyAction(@PathParam('goodsId') goodsId: string, @Req() req: Express.Request, @Res() res: Express.Response) {
    let _id = Mongodb.ObjectID(goodsId);
    let modifyValue = req.body;

    let goods = await this.goodsService.modifyGoods(_id, modifyValue);

    res.sendJson(goods);
  }
}