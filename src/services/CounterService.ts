import {Service, Inject} from 'mvc-ts';
import { Counter } from '../model/Counter';

@Service()
export class CounterService {
  @Inject()
  private counter: Counter;

  public async getNextSequenceValue(name: string): Promise<number> {
    const result = await this.counter.getCollection().findOneAndUpdate({name}, {
      $set: {name},
      $inc: {
        sequence_value: 1
      }
    }, {
      upsert: true,
      returnOriginal: false
    });

    return result.value.sequence_value;
  }

  public async getNextStoreId(): Promise<string> {
    let id = await this.getNextSequenceValue('store');
    if (id > 100000) {
      return 'store' + id;
    } else if (id > 10000) {
      return 'store0' + id;
    } else if (id > 1000) {
      return 'store00' + id;
    } else if (id > 100) {
      return 'store000' + id;
    } else if (id > 10) {
      return 'store0000' + id;
    } else if (id >= 1) {
      return 'store00000' + id;
    }
  }

  public async getNextGoodsId(): Promise<string> {
    let id = await this.getNextSequenceValue('goods');
    if (id > 100000) {
      return 'G' + id;
    } else if (id > 10000) {
      return 'G0' + id;
    } else if (id > 1000) {
      return 'G00' + id;
    } else if (id > 100) {
      return 'G000' + id;
    } else if (id > 10) {
      return 'G0000' + id;
    } else if (id >= 1) {
      return 'G00000' + id;
    }
  }
}