import {Settings, RpcClientRegistry} from 'grpc-client-ts';
import { SettingsRestry } from './SettingsRegistry';

export class ClientRpcRegistry {
  private static _client: RpcClientRegistry;

  static get client(): RpcClientRegistry {
    return this._client;
  }

  static start() {
    this._loadClientRpc();

    this._start();
  }

  private static _start() {
    this.client.start();
  }

  private static _loadClientRpc() {
    @Settings(SettingsRestry.settings)
    class Client extends RpcClientRegistry {}

    this._client = Client;
  }

}