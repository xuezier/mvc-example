import {} from 'grpc-client-ts';
import { Property } from './interface/Property';

export class ClientContainer {
  private static rpcs: {target: Function, route: string}[] = [];

  static registryClient(target: Function, property: Property) {

  }

  static registryRPC(target: Function, property: Property) {

  }

  private static _generateFunc(key: string, property: Property){

  }
}