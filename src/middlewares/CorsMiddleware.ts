import { Middleware, IMiddleware, Next, Req, Res, ConfigContainer } from 'mvc-ts';

import * as CORS from 'cors';
import * as Express from 'express';

let corsOptions = function (whitelist) {
  return {
    origin: function (origin, callback) {
      if (!origin) {
        origin = '*';
        callback(null, true)
      } else if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  }
}

@Middleware({ order: 0 })
export class CorsMiddleware implements IMiddleware {
  private config: { whitelist: string } = ConfigContainer.get('utils.cors');

  public use(@Req() req: Express.Request, @Res() res: Express.Response, @Next() next: Express.NextFunction) {
    CORS(corsOptions(this.config.whitelist))(req, res, next);
  }
}