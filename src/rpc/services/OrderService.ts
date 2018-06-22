import { Route, Service } from "../../lib/grpc";

@Service(__dirname + '/../protobuf/orderService.proto')
class OrderService {
  name = 123;

  @Route
  public async create(CreateMessage) {

  }

  @Route
  public async getList(getParam: { page: number, pagesize: numbner }) {

  }
}

new OrderService;