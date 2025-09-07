import {app, BrowserWindow, ipcMain} from "electron";
import path from "path";
import { URL } from 'url';
import index from "../html/index.html";
import registerIpc from "./backend/server/ipc";
import NodeBackend from "./backend";
import startRender from "./renderer";
import {loadConfig} from "./backend/config";

async function createWindow(): Promise<void> {
  const mainWindow = new BrowserWindow({
    height: 1000,
    width: 1800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegrationInWorker: true,
      nodeIntegration: true,
      contextIsolation: false,
      zoomFactor: 1.0,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.pathname.endsWith('detail.html')) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
        width: 600,
        height: 500,
        parent: mainWindow,
        modal: true,
        autoHideMenuBar: true,
        webPreferences: { // Explicitly set webPreferences for the new window
          nodeIntegration: true,
          contextIsolation: false,
        }
      }
      };
    }
    return { action: 'deny' };
  });

  mainWindow.maximize();

  await mainWindow.loadFile(path.join(__dirname, index));

  // mainWindow.webContents.openDevTools();
}

if (process && process.type === 'renderer') {
  startRender().then();
} else {
  app.on("ready", async () => {
    await loadConfig();
    registerIpc(new NodeBackend(), ipcMain);
    await createWindow();
  });

  app.on("window-all-closed", () => {
    app.quit();
  });
}
