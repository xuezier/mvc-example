import * as Express from 'express';
import * as Mongodb from 'Mongodb';

import { RestController, Req, Res, BodyParam, Inject, Get, Put } from 'mvc-ts';
import { CartService } from '../../services';
import { User, CartItem } from '../../model';

@RestController('/api/cart')
export class CartController {
  @Inject()
  private cartService: CartService;

  @Get('/')
  public async getAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    let user: User = req.user;
    let cart = await this.cartService.getCart(user._id);

    res.sendJson(cart);
  }

  @Put('/add')
  public async addAction(@BodyParam('goods') goods: String, @BodyParam('nums') nums: Number, @BodyParam @Res() res: Express.Response) {
    let user: User = req.user;
    goods = Mongodb.ObjectID(goods);

    let result = await this.cartService.addCart(user._id, {goods, nums});

    res.sendJson(result);
  }

  @Put('/remove')
  public async removeAction(@BodyParam('goods') goods: String, @Res() res: Express.Response) {
    let user: User = req.user;
    goods = Mongodb.ObjectID(goods);

    let result = await this.cartService.removeCart(user._id, goods);

    res.sendJson(result);
  }
}