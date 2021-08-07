import {IpcMain} from "electron";
import {Backend} from "../../data/backend";
import registerBackend from "./index";

export default function registerIpc(backend: Backend, ipcMain: IpcMain) {
  const registerRoute = (route: string, f: () => unknown) => {
    ipcMain.handle(route, async _ => {
      return JSON.stringify(await f());
    });
  }
  registerBackend(backend, registerRoute);
}
