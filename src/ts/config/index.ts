import DEFAULT_CONFIG from "./default";
import {Config} from "./interface";
import * as electron from "electron";
import * as path from "path";
import * as fs from "fs";

const CONFIG_FILE_NAME = "config.json";
let config: Config | undefined = undefined;

const getConfigFolder = async () => electron.ipcRenderer.invoke('config-file-name');
const getConfigFile = async () => path.join(await getConfigFolder(), CONFIG_FILE_NAME);

export async function loadConfig() {
  const fileName = await getConfigFile();
  try {
    const contents = await fs.promises.readFile(fileName).then(buf => buf.toString());
    config = JSON.parse(contents);
  } catch {
    console.log("Unable to find or parse config file, using default");
    config = DEFAULT_CONFIG;
  }
}

export function getConfig(): Config {
  return config || DEFAULT_CONFIG;
}

export async function updateConfig(newConfig: Config): Promise<void> {
  config = newConfig;
  await fs.promises.writeFile(await getConfigFile(), JSON.stringify(newConfig));
}
