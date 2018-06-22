import * as Express from 'express';
import * as Mongodb from 'mongodb';

import { Inject, RestController, Post, Get, Req, Res, BodyParam } from 'mvc-ts';
import { ManagerService } from '../../services';
import { User } from '../../model';
import { DefinedError } from '../../model/DefinedError';

@RestController('/api/manager')
export class ManagerController {
  @Inject()
  private managerService: ManagerService;

  @Get('/info')
  public async getInfoAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    var user: User = req.user;

    let manager = await this.managerService.getManagerByUser(user._id);

    if(!manager) {
      throw new DefinedError(400, 'user_not_a_manager');
    }

    res.sendJson(user);
  }

  @Post('/bind')
  public async bindAction(@BodyParam('code') code: string, @Req() req: Express.Request, @Res() res: Express.Response) {
    let user: User = req.user;
console.log(code)
    let manager = await this.managerService.bindManager(user._id, code);

    res.sendJson(manager);
  }

  @Post('/code')
  public async createCodeAction(@BodyParam('code') code: string, @BodyParam('user') user: string, @Res() res: Express.Response) {
    user = Mongodb.ObjectID(user);

    let bindCode = await this.managerService.createCode(user, code);

    res.sendJson(bindCode);
  }
}