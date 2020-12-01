import * as si from "systeminformation";
import {ModelInformation, OSInformation} from "../data/system";

export async function getOSInformation(): Promise<OSInformation> {
  const info = await si.osInfo();
  return {
    type: info.distro,
    version: info.release,
    architecture: info.arch
  }
}

export async function getModelInformation(): Promise<ModelInformation> {
  const info = await si.system();
  return {
    manufacturer: info.manufacturer,
    model: info.model
  }
}
