import { ISettings } from "./interface/ISettings";

export class SettingsRestry {
  static settings: ISettings;

  static registry(settings: ISettings) {
    this.settings = settings;
  }
}