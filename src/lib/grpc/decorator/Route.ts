import { ServiceContainer } from "../ServiceContainer";
import { Property } from "../interface/Property";

export function Route(target: Function, key: string, property: Property) {
  ServiceContainer.registryService(target, key, property);
}