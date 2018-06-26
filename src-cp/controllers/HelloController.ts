import * as Express from 'express';

import { Inject, RestController, Get, Res } from "mvc-ts";
import { Order, Hello } from '../rpc';

@RestController('/example')
export class HelloController {
  @Inject()
  private helloRpc: Hello;

  @Get('/hello')
  public async indexAction(@Res() res: Express.Response) {
    let result = await this.helloRpc.say({});
    res.json(result);
  }
}