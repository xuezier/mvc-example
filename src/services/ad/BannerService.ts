import * as Mongodb from 'mongodb';

import {Service, Inject} from 'mvc-ts';
import { Banner } from '../../model';

@Service()
export class BannerService {
  @Inject()
  private banner: Banner;

  /**
   * create a new ad banner
   *
   * @param {*} info
   * @returns {Promise<Banner>}
   * @memberof BannerService
   */
  public async createBanner(info: any): Promise<Banner> {
    let insertValue: Banner = this.banner.schema(info);
    let result = await this.banner.getCollection().insertOne();

    insertValue._id = result.insertedId;
    return insertValue;
  }

  /**
   * delete a ad banner
   *
   * @param {Mongodb.ObjectID} _id
   * @returns {Promise<Banner>}
   * @memberof BannerService
   */
  public async removeBanner(_id: Mongodb.ObjectID): Promise<Banner> {
    let result = await this.banner.getCollection().findOneAndDelete({_id});

    return result.value;
  }
}