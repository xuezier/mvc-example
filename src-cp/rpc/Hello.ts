import { Vendor } from "mvc-ts";
import { Route, Client } from "../lib/grpc";

@Vendor()
@Client(__dirname + '/protobuf/Hello.proto')
export class Hello {
  @Route
  public async say(data, result) {
    console.log(1122, result);
  }
}
