export interface ISettings {
  // grpc bind port
  port: string | number;

  // grpc bind host
  host?: string;

  // ca file path string
  ca?: string;

  cert?: string;

  key?: string;

  // cert file path string
  client_cert?: string;

  // key file path string
  client_key?: string;
}