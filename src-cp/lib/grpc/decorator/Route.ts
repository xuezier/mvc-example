import { ClientContainer } from "../ClientContainer";
import { Property } from "../interface/Property";

export function Route(target: Function, key: string, property: Property) {
  console.log(property.value);
  let func = property.value;
  property.value = function () {
    console.log(this, 123);
    func();
    return 123
  }
  ClientContainer.registryRoute(target, key, property.value);
}