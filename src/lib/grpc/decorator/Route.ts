import { ServiceContainer } from "../ServiceContainer";

export function Route(target: Function, key: string, property: Property) {
  ServiceContainer.registryService(target, key, property);
}