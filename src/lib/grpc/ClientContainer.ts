import {} from 'grpc-client-ts';
import { Property } from './interface/Property';

export class ClientContainer {
  static private rpcs: {target: Function, route: string}[] = [];

  static registryClient(target: Function, property: Property) {

  }

  static private _generateFunc(key: string, property: Property){

  }
}