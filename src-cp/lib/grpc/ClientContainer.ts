/**
 * @author Xuezi
 * @email xzj15859722542@hotmail.com
 * @create date 2018-06-22 11:49:57
 * @modify date 2018-06-22 11:49:57
 * @desc [description]
*/
import * as GRPC from 'grpc';
import { Property } from './interface/Property';

export class ClientContainer {
  static clients: { service: any, client: GRPC.Client, target: Function }[] = [];
  static routes: { target: Function, property: Property, key: string }[] = [];


  static registryClient(target: Function, path: string) {
    let protoDescriptor = GRPC.load(path);

    const packages = Object.keys(protoDescriptor);
    for (let packageKey of packages) {
      for (let key in protoDescriptor[packageKey]) {
        if (protoDescriptor[packageKey][key].hasOwnProperty('service')) {
          this.clients.push({ target, service: protoDescriptor[packageKey][key] });
        }
      }
    }
  }

  static registryRoute(target: Function, property: Property, key: string) {
    this.routes.push({ target, property, key });
  }

  static generateRouteFunc(route: { target: Function, property: Property, key: string }) {

  }

  static private _generateRouteFunc(route: Function): Function {

  }

  static getRoutes(target: Function): { target: Function, property: Property, key: string }[] {
    let routes = this.routes.filter(route => route.target === target);
    return routes;
  }

  static getRoute(target: Function, key: string): { target: Function, property: Property, key: string } {
    let route = this.routes.find(route => (route.key === key && route.target === target));
    return route;
  }

  static getClient(target: Function): any[] {
    let client = this.clients.find(client => client.target === target);
    return client;
  }
}