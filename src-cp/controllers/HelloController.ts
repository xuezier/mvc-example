import * as Express from 'express';

import { Inject, RestController, Get, Res } from "mvc-ts";
import { Order } from '../rpc';

@RestController('/example')
export class HelloController {
  @Inject()
  private orderRpc: Order;

  @Get('/hello')
  public async indexAction(@Res() res: Express.Response) {

    let result = await this.orderRpc.create({
      owner: '1',
      payer: '2',
      amount: 333,
      remark: '4'
    });
    res.json(result);
  }
}