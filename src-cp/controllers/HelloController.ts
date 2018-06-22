import * as Express from 'express';

import { Inject, RestController, Get, Res } from "mvc-ts";
import { Order } from '../rpc';

@RestController('/example')
export class HelloController {
  @Inject()
  private orderRpc: Order;

  @Get('/hello')
  public async indexAction(@Res() res: Express.Response) {
    console.log(this.orderRpc.create());
    res.send(200, 123);
  }
}