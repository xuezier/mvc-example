import * as Express from 'express';
import * as Mongodb from 'mongodb';

import { RestController, Post, Get, Put, Req, Res, BodyParam, Inject, PathParam } from 'mvc-ts';
import { StoreAddressService } from '../../services';

@RestController('/api/store/address')
export class StoreAddressController {
  @Inject()
  private storeAddressService: StoreAddressService;

  @Post('/')
  public async createAction(@Req() req: Express.Request, @Res(): res : Express.Response) {
    let body: StoreAddress = req.body;

    let address = await this.storeAddressService.createAddress(body);

    res.sendJson(address);
  }

  @put('/modify/:address')
  public async modifyAction(@Req() req: Express.Request, @PathParam('address') address: string, @Res() res: Express.Response) {
    address = Mongodb.ObjectID(address);

    let result = await this.storeAddressService.modifyStoreAddress(address, req.body);

    res.sendJson(result);
  }
}
