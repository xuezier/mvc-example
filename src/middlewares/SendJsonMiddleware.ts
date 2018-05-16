import {Middleware, IMiddleware, Res, Next} from 'mvc-ts';
import * as Express from 'express';

@Middleware({order: 1})
export class SendJsonMiddleware implements IMiddleware {
  public use(@Res() res: Express.Response, @Next() next: Express.NextFunction) {
    res.sendJson = function sendJson(
      status: number | object,
      data: object | string,
      message: string | undefined | object) {

      if (typeof status === 'object') {
        message = data;
        data = status;
        status = 200;
      }

      if (!status) {
        status = 200;
      }

      res.json({
        status,
        data,
        message
      });
    };
    next();
  }
}