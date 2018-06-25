import { Route, Service } from "../../lib/grpc";

@Service(__dirname + '/../protobuf/orderService.proto')
class OrderService {
  name = 123;

  @Route
  public async create(CreateMessage) {
    console.log('heiheihei')
    return [{ product_id: '123', name: '456', price: 5555 }];
  }

  @Route
  public async getList(getParam: { page: number, pagesize: numbner }) {

  }
}

new OrderService;