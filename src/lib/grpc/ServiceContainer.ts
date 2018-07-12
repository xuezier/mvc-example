import {Route, Service} from 'grpc-server-ts';
import { Property } from './interface/Property';

export class ServiceContainer {
  static registryService(target: Function, key: string, property: Property) {}

  static getFuncByRoute(route: string): Function {

  }
}