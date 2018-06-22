import { Route, Service } from "../../lib/grpc";

@Service(__dirname + '/../protobuf/orderService.proto')
class OrderService {
  name = 123;

  @Route
  public async create(call) {

  }

  @Route
  public async getList(call) {

  }
}

new OrderService;