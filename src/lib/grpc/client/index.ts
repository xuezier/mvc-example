import {Route, Client} from 'grpc-client-ts';
import { IData } from '../interface/IData';
import { IResult } from '../interface/IResult';

@Client(__dirname+'/../services/service.proto')
export class RootClient {
  @Route
  public async route(iData: IData, iResult: IResult) {
    let {id, type, data, route} = iResult;

    if(type === 'json')
      data = JSON.parse(data);

    return {id, type, data, route};
  }
}