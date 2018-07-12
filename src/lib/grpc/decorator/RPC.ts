import { Property } from "../interface/Property";
import { ClientContainer } from "../ClientContainer";

export function RPC(target: Function, key: string, property: Property) {
  ClientContainer.registryRPC(target, property);
}