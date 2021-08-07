import {Config} from "../../backend/config/interface";

export interface SettingPropType {
  updateConfig: (newConfig: Config) => unknown;
}
