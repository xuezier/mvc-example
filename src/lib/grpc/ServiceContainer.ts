/**
 * @author Xuezi
 * @email xzj15859722542@hotmail.com
 * @create date 2018-06-14 06:11:20
 * @modify date 2018-06-14 06:11:20
 * @desc [description]
*/
import * as GRPC from 'grpc';

export class ServiceContainer {
  static services: { service: any, target: Function }[] = [];
  static routes: { target: Function, route: Function, func: Function }[] = [];
  /**
   * @description registry grpc service
   * @author Xuezi
   * @static
   * @param {Function} target service constructor
   * @param {string} path proto file path
   * @memberof ServiceContainer
   */
  static registryService(target: Function, path: string) {
    let protoDescriptor = GRPC.load(path);

    const packages = Object.keys(protoDescriptor);
    for (let packageKey of packages) {
      for (let key in protoDescriptor[packageKey]) {
        if (protoDescriptor[packageKey][key].hasOwnProperty('service')) {
          this.services.push({ service: protoDescriptor[packageKey][key]['service'], target });
        }
      }
    }
  }

  static registryRoute(target: Function, route: Function) {
    if (this.routes.find(r => (r.target === target && r.route === route)))
      return;

    let func = this._generateRouteFunc(route);
    this.routes.push({ target, route, func });

    console.log(this.services, this.routes);
  }

  static private _generateRouteFunc(route: Function): Function {
    let func = function (call) {
      call.on('data', async function (data) {
        let result = await route(data);
        if (result) call.write(result);
      });
      call.on('end', function () {
        call.end();
      });
    };

    return func;
  }

  static getService(target: Function): any[] {
    let services = this.services.filter(service => service.target === target);
    return services;
  }
}