import * as Express from 'express';
import * as Mongodb from 'mongodb';

import { RestController, Post, Get, Put, Req, Res, BodyParam, Inject, PathParam } from 'mvc-ts';
import { StoreAddressService, StoreService } from '../../services';
import { User } from '../../model';

@RestController('/api/store/address')
export class StoreAddressController {
  @Inject()
  private storeAddressService: StoreAddressService;

  @Inject()
  private storeService: StoreService;

  @Post('/')
  public async createAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    let body: StoreAddress = req.body;

    let address = await this.storeAddressService.createAddress(body);

    res.sendJson(address);
  }

  @Put('/modify/:address')
  public async modifyAction(@Req() req: Express.Request, @PathParam('address') address: string, @Res() res: Express.Response) {
    address = Mongodb.ObjectID(address);

    let result = await this.storeAddressService.modifyStoreAddress(address, req.body);

    res.sendJson(result);
  }

  @Get('/:address')
  public async getInfoAction(@PathParam('address') address: string, @Res() res: Express.Response) {
    address = Mongodb.ObjectID(address);
    let address = await this.storeAddressService.getAddressById(address);

    res.sendJson(address);
  }
}
