import {Settings, RpcRegistry} from 'grpc-server-ts';
import { SettingsRestry } from './SettingsRegistry';

export class ServiceRpcRegistry {
  static private _service: RpcRegistry;

  static get service() {
    return this._service;
  }

  static start() {
    this._loadRpcService();

    this._start();
  }

  static private _start() {
    this.service.start();
  }

  static private _loadRpcService() {
    @Settings(SettingsRestry.settings)
    class service extends RpcRegistry {}

    this._service = service;
  }
}