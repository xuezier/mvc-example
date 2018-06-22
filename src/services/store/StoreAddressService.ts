/**
 * @author Xuezi
 * @email xzj15859722542@hotmail.com
 * @create date 2018-06-11 10:05:23
 * @modify date 2018-06-11 10:05:23
 * @desc [description]
*/
import * as Mongodb from 'mongodb';
import { Service, Inject } from 'mvc-ts';
import * as _ from 'lodash';

import { StoreAddress } from '../../model';
import { DefinedError } from '../../model/DefinedError';

@Service()
export class StoreAddressService {
  @Inject()
  private storeAddress: StoreAddress;

  /**
   * @description
   * @author Xuezi
   * @param {{
   *     mobile?: string,
   *     telephone?: string,
   *     email?: string,
   *     contact?: string,
   *     address: {
   *       longitude?: number,
   *       latitude?: number,
   *       state: string,
   *       province: string,
   *       city: string,
   *       county: string,
   *       town: string,∏
   *       street: string,
   *       mart?: string,
   *       zip?: string
   *     }
   *   }} info
   * @returns {Promise<StoreAddress>}
   * @memberof StoreAddressService
   */
  public async createAddress(info: {
    mobile?: string,
    telephone?: string,
    email?: string,
    contact?: string,
    address: {
      longitude?: number,
      latitude?: number,
      state: string,
      province: string,
      city: string,
      county: string,
      town: string,
      street: string,
      mart?: string,
      zip?: string
    }
  }): Promise<StoreAddress> {
    let address: StoreAddress = this.storeAddress.schema(info);

    let result = await this.storeAddress.getCollection().insertOne(address);

    address._id = result.insertedId;
    return address;
  }

  /**
   * @description get a store address by address id
   * @author Xuezi
   * @param {Mongodb.ObjectID} _id
   * @returns {Promise<StoreAddress>}
   * @memberof StoreAddressService
   */
  public async getAddressById(_id: Mongodb.ObjectID): Promise<StoreAddress> {
    let address: StoreAddress = await this.storeAddress.getCollection().findOne({ _id });

    if (!address)
      throw new DefinedError(400, 'address_not_exists');

    return address;
  }

  private async _modifyAddress(_id: Mongodb.ObjectID, info: any): Promise<StoreAddress> {
    let address = await this.storeAddress.getCollection().findOne({ _id });

    if (!address) {
      throw new DefinedError(400, 'address_not_exists');
    }

    let modifyInfo = this.storeAddress.schema(_.merge(address, info));
    let result = await this.storeAddress.getCollection().findOneAndUpdate({ _id }, { $set: modifyInfo }, {
      upsert: false,
      returnOriginal: false
    });

    return result.value;
  }

  /**
   * @description modify address
   * @author Xuezi
   * @param {Mongodb.ObjectID} address
   * @param {Object} info
   * @returns {Promise<StoreAddress>}
   * @memberof StoreAddressService
   */
  public async modifyStoreAddress(address: Mongodb.ObjectID, info: Object): Promise<StoreAddress> {
    return await this._modifyAddress(address, info);
  }
}