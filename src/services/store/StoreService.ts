/**
 * @author Xuezi
 * @email xzj15859722542@hotmail.com
 * @create date 2018-06-11 09:46:58
 * @modify date 2018-06-11 09:46:58
 * @desc [description]
*/
import * as Mongodb from 'mongodb';
import { Service, Inject } from 'mvc-ts';
import * as _ from 'lodash';

import { Store, URL_TYPE, StoreAddress, Manager, User } from '../../model';
import { StoreAddressService } from './StoreAddressService';
import { DefinedError } from '../../model/DefinedError';
import { ManagerService, CounterService } from '..';

@Service()
export class StoreService {
  @Inject()
  private store: Store;

  @Inject()
  private storeAddressService: StoreAddressService;

  @Inject()
  private managerService: ManagerService;

  @Inject()
  private counterService: CounterService;


  private async _modifyStore(_id: Mongodb.ObjectID, info: any): Promise<Store> {
    let store = await this.store.getCollection().findOne({ _id });
    if (!store)
      throw new DefinedError(400, 'store_not_exists');

    let modifyInfo = this.store.schema(_.merge(store, info));

    let result = await this.store.getCollection().findOneAndUpdate({ _id }, { $set: modifyInfo }, {
      upsert: false,
      returnOriginal: false
    });
    return result.value;
  }

  /**
   * @description create a new store
   * @author Xuezi
   * @param {{
   *     name: string,
   *     brief_introduction: string,
   *     owner: Mongodb.ObjectID,
   *     url: string,
   *     url_type: URL_TYPE,
   *     description?: string,
   *     address?: Mongodb.ObjectID,
   *   }} info
   * @returns {Promise<Store>}
   * @memberof StoreService
   */
  public async createStore(info: {
    name: string,
    brief_introduction: string,
    owner: Mongodb.ObjectID,
    url: string,
    url_type: URL_TYPE,
    description?: string,
    address?: Mongodb.ObjectID,
  }, user: User): Promise<Store> {
    let exists = await this.getStoreByOwner(user._id);
    if (exists)
      throw new DefinedError(400, 'store_exists', 'user already has a store');

    info.owner = user._id;
    let store: Store = this.store.schema(info);

    if (store.url_type === URL_TYPE.SYSTEM)
      store.url = await this.counterService.getNextStoreId();

    let address = await this.storeAddressService.createAddress({
      mobile: user.mobile,
      email: user.email,
      address: {
        state: '',
        province: '',
        city: '',
        county: '',
        town: '',
        street: ''
      }
    });
    store.address = address._id;

    let result = await this.store.getCollection().insertOne(store);
    store._id = result.insertedId;

    let manager: Manager = await this.managerService.createManager(user._id, store._id);

    return store;
  }

  public async getStoreByOwner(owner: Mongodb.ObjectID): Promise<Store> {
    let store = await this.store.getCollection().findOne({ owner });
    return store;
  }

  /**
   * @description put a address to store
   * @author Xuezi
   * @param {Mongodb.ObjectID} address_id
   * @param {Mongodb.ObjectID} store
   * @returns {Promise<Store>}
   * @memberof StoreService
   */
  public async setAddress(address_id: Mongodb.ObjectID, store: Mongodb.ObjectID): Promise<Store> {
    let address: StoreAddress = await this.storeAddressService.getAddressById(address_id);

    if (!address) {
      throw new DefinedError(400, 'address_not_exists');
    }

    let exists = await this.store.getCollection().findOne({ address: address_id });
    if (exists) {
      throw new DefinedError(400, 'address_in_used');
    }

    let rStore = await this._modifyStore(store, { address: address_id });

    return rStore;
  }
}