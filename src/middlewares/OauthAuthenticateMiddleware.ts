import {Middleware, IMiddleware, Res, Req, Next, ApplicationLoader, Inject} from 'mvc-ts';

import * as Express from 'express';
import * as OauthServer from 'oauth2-server';

@Middleware({baseUrl: /^(\/api|wechat\/bind)/})
export class OauthAuthenticationMiddleware implements IMiddleware {

  @Inject()
  private application: ApplicationLoader;

  public async use(
    @Req() req: Express.Request,
    @Res() res: Express.Response,
    @Next() next: Express.NextFunction) {
    const request = new OauthServer.Request(req);
    const response = new OauthServer.Response(res);

    const token = await this.application.getModel('oauth').authenticate(request, response);

    req.user = token.user;
    next();
  }
}

// @Middleware({baseUrl: '/api'})
// export class ApiOauthMiddleware implements IMiddleware {
//   @Inject()
//   private application: ApplicationLoader;

//   public async use(
//     @Req() req: Express.Request,
//     @Res() res: Express.Response,
//     @Next() next: Express.NextFunction) {
//       console.log(req.headers)
//     const request = new OauthServer.Request(req);
//     const response = new OauthServer.Response(res);

//     const token = await this.application.getModel('oauth').authenticate(request, response);

//     req.user = token.user;
//     next();
//   }
// }

// @Middleware({baseUrl: '/wechat/bind'})
// export class WechatOauthMiddleware extends OauthAuthenticationMiddleware implements IMiddleware {}
