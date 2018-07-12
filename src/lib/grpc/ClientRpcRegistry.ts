import {Settings, RpcClientRegistry} from 'grpc-client-ts';
import { SettingsRestry } from './SettingsRegistry';

export class ClientRpcRegistry {
  static private _client: RpcClientRegistry;

  static get client(): RpcClientRegistry {
    return this._client;
  }

  static start() {
    this._loadClientRpc();

    this._start();
  }

  static private _start() {
    this.client.start();
  }

  static private _loadClientRpc() {
    @Settings(SettingsRestry.settings)
    class Client extends RpcClientRegistry {}

    this._client = Client;
  }

}