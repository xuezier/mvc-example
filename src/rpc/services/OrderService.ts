import { Route, Service } from "grpc-server-ts";

@Service(__dirname + '/../protobuf/orderService.proto')
class OrderService {
  name = 123;

  @Route
  public async create(CreateMessage) {
    console.log('heiheihei')
    return Array.from({ length: 10 }).fill({ product_id: '123', name: '456', price: 5555 });
  }

  @Route
  public async getList(getParam: { page: number, pagesize: number }) {

  }
}

new OrderService;