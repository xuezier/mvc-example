import * as Express from 'express';

import {RestController, Req, Res, Post, Get, Put, Delete, Inject} from 'mvc-ts';

@RestController('/api/goods')
export class GoodsController {

  @Post('/')
  public async createAction(@Req() req: Express.Request, @Res() res: Express.Response) {

  }

  @Get('/')
  public async getListAction(@Res() res: Express.Response) {

  }
}