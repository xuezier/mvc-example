import { Vendor } from "mvc-ts";
import { Route, Client } from "../lib/grpc";

@Vendor()
@Client(__dirname + '/protobuf/orderService.proto')
export class Order {
  @Route
  public async create(data, result) { }
}
