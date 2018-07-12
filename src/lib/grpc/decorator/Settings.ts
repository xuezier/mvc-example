import {ISettings} from "../interface/ISettings";
import {SettingsRestry} from "../SettingsRegistry";

export function Settings(settings: ISettings) {
  return function () {
    SettingsRestry.registry(settings);
  }
}