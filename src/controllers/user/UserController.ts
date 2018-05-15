import * as Express from 'express';
import * as _ from 'lodash';

import {Get, Put, Data, Res, Req, RestController, Inject, QueryParam, BodyParam, Next} from 'mvc-ts';

import {UserService} from '../../services';
import {User} from '../../model';

import { SmsRedisService, OauthAccessTokenRedisService } from '../../services/RedisService';

@RestController('/api/user')
export class UserConteoller {
  @Inject()
  private oauthRedis: OauthAccessTokenRedisService;

  @Inject()
  private userService: UserService;

  @Inject()
  private smsRedis: SmsRedisService;

  @Inject()
  private user: User;

  @Get('/info')
  public async infoAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    const user: User = req.user;

    res.sendJson(user);
  }

  @Put('/info') 
  modifyInfoMiddleware(@Req() req: Express.Request, @Next() next: Express.NextFunction) {
    const body = req.body;
    delete body.password;
    req.body = body;

    next();
  }

  @Put('/info')
  public async modifyInfoAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    const body: User = req.body;

    if (_.isEmpty(body)) {
      throw new Error('put_nothing');
    }

    const user: User = req.user;
    const modify: User = this.user.schema(body);

    const modifiedUser: User = await this.userService.modify(user._id, modify);
    await this.oauthRedis.setUser(modifiedUser);

    res.sendJson(modifiedUser);
  }
}