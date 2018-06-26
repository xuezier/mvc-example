import { Route, Service } from "grpc-server-ts";

@Service(__dirname + '/../protobuf/Hello.proto')
export class HelloService {
  name = 123;

  @Route
  public async say() {
    return 'hello world';
  }
}