import {app, BrowserWindow, ipcMain} from "electron";
import path from "path";
import index from "../html/index.html";
import registerIpc from "./backend/server/ipc";
import NodeBackend from "./backend";
import startRender from "./renderer";

async function createWindow(): Promise<void> {
  const mainWindow = new BrowserWindow({
    height: 1000,
    width: 1800,
    webPreferences: {
      nodeIntegrationInWorker: true,
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  mainWindow.maximize();

  await mainWindow.loadFile(path.join(__dirname, index));

  mainWindow.webContents.openDevTools();
}

if (process && process.type === 'renderer') {
  startRender().then();
} else {
  app.on("ready", async () => {
    registerIpc(new NodeBackend(), ipcMain);
    await createWindow();
  });

  app.on("window-all-closed", () => {
    app.quit();
  });
}
