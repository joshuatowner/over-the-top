import {Config} from "../../config/interface";

export interface SettingPropType {
  updateConfig: (newConfig: Config) => unknown;
}
