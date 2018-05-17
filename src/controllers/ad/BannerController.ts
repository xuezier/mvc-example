import * as Express from 'express';
import * as Mongodb from 'mongodb';

import {RestController, Post, Delete, PathParam, Req, Res, Inject} from 'mvc-ts';
import { BannerService } from '../../services';
import { Banner } from '../../model';

@RestController('/api/ad/banner')
export class BannerController {
  @Inject()
  private bannerService: BannerService;

  @Post('/')
  public async createAction(@Req() req: Express.Request, @Res() res: Express.Response) {
    let body: Banner = req.body;

    if (body.image) {
      body.image = Mongodb.ObjectID(body.image);
    }

    let banner = await this.bannerService.createBanner(body);

    res.sendJson(banner);
  }

  @Delete('/:bannerId')
  public async deleteAction(@PathParam('bannerId') bannerId: string, @Res() res: Express.Response) {
    let _id = Mongodb.ObjectID(bannerId);

    let result = this.bannerService.removeBanner(_id);

    res.sendJson(result);
  }
}