/**
 * @author Xuezi
 * @email xzj15859722542@hotmail.com
 * @create date 2018-06-11 10:50:09
 * @modify date 2018-06-11 10:50:09
 * @desc [description]
*/
import * as Express from 'express';
import * as Mongodb from 'mongodb';

import { RestController, Res, Req, BodyParam, Post, Get, Put, Inject } from 'mvc-ts';
import { StoreService } from '../../services';
import { Store, User } from '../../model';
import { ADDRGETNETWORKPARAMS } from 'dns';


@RestController('/api/store')
export class StoreController {
  @Inject()
  private storeService: StoreService;

  @Post('/')
  public async createAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    let body: Store = req.body;
    let user: User = req.user;
    body.owner = user._id;

    let store = await this.storeService.createStore(body);

    res.sendJson(store);
  }

  @Put('/set/address')
  public async putAddressAction(
    @BodyParam('address') address: string,
    @BodyParam('store') store: string,
    @Res() res: Express.Response) {
    address = Mongodb.ObjectID(address);
    store = Mongodb.ObjectID(store);

    let result = await this.storeService.setAddress(address, store);

    res.sendJson(result);
  }
}