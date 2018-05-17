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
  public async addAction(@BodyParam('item') item: CartItem, @Res() res: Express.Response) {

  }
}