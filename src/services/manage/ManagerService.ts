import * as Mongodb from 'mongodb';

import { Service, Inject } from 'mvc-ts';
import { Manager, ManagerBindCode, ManagerBindCodeStatus, ManagerLevel } from '../../model';
import { DefinedError } from '../../model/DefinedError';

@Service()
export class ManagerService {
  @Inject()
  private manager: Manager;

  @Inject()
  private managerBindCode: ManagerBindCode;

  /**
   * @description get nabager by user _id
   * @author Xuezi
   * @param {Mongodb.ObjectID} user
   * @returns {Promise<Manager>}
   * @memberof ManagerService
   */
  public async getManagerByUser(user: Mongodb.ObjectID): Promise<Manager> {
    let manager: Manager = await this.manager.getCollection().findOne({ user });
    return manager;
  }

  /**
   * @description create a new store manager
   * @author Xuezi
   * @param {Mongodb.ObjectID} user
   * @param {Mongodb.ObjectID} store
   * @returns {Promise<Manager>}
   * @memberof ManagerService
   */
  public async createManager(user: Mongodb.ObjectID, store: Mongodb.ObjectID): Promise<Manager> {
    let manager: Manager = this.manager.schema({ user, store });

    let result = await this.manager.getCollection().insertOne(manager);
    manager._id = result.insertedId;
    return manager;
  }

  /**
   * @description create a bew manager by bind code
   * @author Xuezi
   * @param {Mongodb.ObjectID} user
   * @returns {Promise<Manager>}
   * @memberof ManagerService
   */
  public async bindManager(user: Mongodb.ObjectID, code: string): Promise<Manager> {
    let bindCode: ManagerBindCode = await this.managerBindCode.getCollection().findOne({ code });
    if (!bindCode) {
      throw new DefinedError(400, 'code_not_exists');
    }
    if (!user.equals(bindCode.user)) {
      throw new DefinedError(400, 'code_error');
    }

    if (bindCode.status !== ManagerBindCodeStatus.PADDING) {
      throw new DefinedError(400, 'code_used');
    }

    let manager: Manager = this.manager.schema({
      user,
      store: bindCode.store,
      level: bindCode.level || ManagerLevel.salesman
    });
    let result = await this.manager.getCollection().insertOne(manager);
    manager._id = result.insertedId;

    await this._modifyCode(bindCode._id, { status: ManagerBindCodeStatus.USED });

    return manager;
  }

  /**
   * @description create a new manager user bind code
   * @author Xuezi
   * @param {Mongodb.ObjectID} user
   * @param {string} code
   * @returns {Promise<ManagerBindCode>}
   * @memberof ManagerService
   */
  public async createCode(user: Mongodb.ObjectID, code: string): Promise<ManagerBindCode> {
    let exists = await this.managerBindCode.getCollection().findOne({ user });
    if (exists) {
      throw new DefinedError(400, 'code_exists');
    }

    let bindCode: ManagerBindCode = this.managerBindCode.schema({ user, code });
    let result = this.managerBindCode.getCollection().insertOne(bindCode);

    bindCode._id = result.insertedId;
    return bindCode;
  }

  private async _modifyCode(_id: Mongodb.ObjectID, data: ManagerBindCode): Promise<ManagerBindCode> {
    let result = await this.managerBindCode.getCollection().findOneAndUpdate({ _id }, { $set: data }, {
      upsert: false,
      returnOriginal: false
    });

    return result.value;
  }
}