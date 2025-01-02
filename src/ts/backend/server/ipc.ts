import {IpcMain} from "electron";
import {Backend} from "../../data/backend";
import registerBackend from "./index";

export default function registerIpc(backend: Backend, ipcMain: IpcMain) {
  const registerRoute = (route: string, f: () => unknown) => {
    ipcMain.handle(route, async _ => {
      return JSON.stringify(await f());
    });
  }
  const registerInputRoute = (route: string, f: (input: unknown) => unknown) => {
    ipcMain.handle(route, async (_, input) => {
      return JSON.stringify(await f(JSON.parse(input)));
    });
  }
  registerBackend(backend, registerRoute, registerInputRoute);
}
