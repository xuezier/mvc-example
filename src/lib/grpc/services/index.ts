import {Route, Service} from 'grpc-server-ts';
import { IData } from '../interface/IData';
import { IResult } from '../interface/IResult';
import { Container } from '../Container';

@Service(__dirname + '/service.proto')
export class RootService {
  @Route
  public async route(iData: IData): IResult {
    let {id, type = 'json', data, route} = iData;

    if(type === 'json')
      data = JSON.parse(data);

    let func  = Container.getFuncByRoute(route);

    let result: any = await func(data);

    return {
      id,
      type: 'json',
      result: result || {},
      route
    };
  }
}