import {Settings, RpcRegistry} from 'grpc-server-ts';
import { SettingsRestry } from './SettingsRegistry';

export class ServiceRpcRegistry {
  private static _service: RpcRegistry;

  static get service() {
    return this._service;
  }

  static start() {
    this._loadRpcService();

    this._start();
  }

  private static _start() {
    this.service.start();
  }

  private static _loadRpcService() {
    @Settings(SettingsRestry.settings)
    class service extends RpcRegistry {}

    this._service = service;
  }
}