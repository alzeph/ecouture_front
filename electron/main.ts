import { app, BrowserWindow, ipcMain, Menu } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import keytar from "keytar";

// ⚡ Simuler __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constantes
const APP_NAME = "ecouture";
const BASE_URL = "http://localhost:8000";
const ACCESS_TOKEN_KEY = "bccb1b2d192081a10756d1224955c3092471af2f15ec760832a581fa587fe011";
const REFRESH_TOKEN_KEY = "478015630c96c5fc09f1aa7b3f3130b431e9525f81d1589632866952c1539424";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    // mainWindow.loadURL("http://localhost:5173");
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  Menu.setApplicationMenu(null);

  // (Optionnel) enlever aussi le bouton menu (3 lignes) sous Windows/Linux
  mainWindow.setMenuBarVisibility(false)
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

// Communication main <-> renderer
ipcMain.handle(`GET${ACCESS_TOKEN_KEY}`, async () => {
  return await keytar.getPassword(APP_NAME, ACCESS_TOKEN_KEY);
});

ipcMain.handle(`GET${REFRESH_TOKEN_KEY}`, async () => {
  return await keytar.getPassword(APP_NAME, REFRESH_TOKEN_KEY);
});

ipcMain.handle(`SET${ACCESS_TOKEN_KEY}`, async (_, accessToken) => {
  await keytar.setPassword(APP_NAME, ACCESS_TOKEN_KEY, accessToken);
});

ipcMain.handle(`SET${REFRESH_TOKEN_KEY}`, async (_, refreshToken) => {
  await keytar.setPassword(APP_NAME, REFRESH_TOKEN_KEY, refreshToken);
});

ipcMain.handle("DELETE", async () => {
  await keytar.deletePassword(APP_NAME, ACCESS_TOKEN_KEY);
  await keytar.deletePassword(APP_NAME, REFRESH_TOKEN_KEY);
});
