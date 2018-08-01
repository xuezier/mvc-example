/**
 * @author Xuezi
 * @email xzj15859722542@hotmail.com
 * @create date 2018-05-29 02:50:10
 * @modify date 2018-05-29 02:50:10
 * @desc [description]
*/

import * as Mongodb from 'mongodb';
import * as Express from 'express';

import { RestController, Post, Get, Put, Req, Res, Inject, BodyParam, PathParam, Delete } from 'mvc-ts';
import { DiscountService } from '../../services';
import { DefinedError } from '../../model/DefinedError';
import { DiscountType, DiscountCondition } from '../../model';

@RestController('/api/goods/discount')
export class DiscountController {
  @Inject()
  private discountService: DiscountService;

  @Post('/')
  public async createAction(
    @Req() req: Express.Request,
    @BodyParam('type') type: DiscountType,
    @BodyParam('condition') condition: DiscountCondition,
    @BodyParam('satisfied') satisfied: number,
    @BodyParam('start_at') start_at: Date,
    @BodyParam('end_at') end_at: Date,
    @Res() res: Express.Response) {

    let discount = await this.discountService.createDiscount({
      type,
      condition,
      satisfied,
      start_at,
      end_at
    });

    res.sendJson(discount);
  }

  @Put('/disable/:_id')
  public async disableAction(@PathParam('_id') _id: string, @Res() res: Express.Request) {
    _id = Mongodb.ObjectID(_id);

    let discount = await this.discountService.disableDiscount(_id);

    res.sendJson(discount);
  }

  @Put('/enable/:_id')
  public async enableAction(@PathParam('_id') _id: string, @Res() res: Express.Request) {
    _id = Mongodb.ObjectID(_id);

    let discount = await this.discountService.enableDiscount(_id);

    res.sendJson(discount);
  }

  @Post('/add')
  public async addAction(@BodyParam('goods') goods: string, @BodyParam('discount') discount: string, @Res() res: Express.Request) {
    goods = Mongodb.ObjectID(goods);
    discount = Mongodb.ObjectID(discount);

    let result = await this.discountService.addDiscountToGoods(discount, goods);

    if (!result) {
      throw new DefinedError(400, 'goods_not_found');
    }

    res.sendJson(result);
  }

  @Delete('/remove')
  public async removeAction(@BodyParam('goods') goods: string, @Res() res: Express.Response) {
    goods = Mongodb.ObjectID(goods);

    let result = await this.discountService.removeDiscountFromGoods(goods);

    if (!result) {
      throw new DefinedError(400, 'goods_not_found');
    }

    res.sendJson(result);
  }

  @Get('/:_id')
  public async getAction(@PathParam('_id') _id: string, @Res() res: Express.Response) {
    _id = Mongodb.ObjectID(_id);

    let discount = await this.discountService.findDiscountById(_id);

    if (!discount) {
      throw new DefinedError(404, 'discount_not_found');
    }

    res.sendJson(discount);
  }
}