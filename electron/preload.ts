import { contextBridge, ipcRenderer } from "electron";

//constantes
const APP_NAME = "ecouture"
const BASE_URL = "http://localhost:8000"
const ACCESS_TOKEN_KEY = "bccb1b2d192081a10756d1224955c3092471af2f15ec760832a581fa587fe011"
const REFRESH_TOKEN_KEY = "478015630c96c5fc09f1aa7b3f3130b431e9525f81d1589632866952c1539424"



// On expose une API sécurisée au renderer
contextBridge.exposeInMainWorld("electronAPI", {
  ping: async (): Promise<string> => {
    return await ipcRenderer.invoke("ping");
  },
});

// On expose une API non safegardée au renderer
contextBridge.exposeInMainWorld("unsafeElectronAPI", {
  unsafePing: async (): Promise<string> => {
    return await ipcRenderer.invoke("unsafePing");
  },
  setTokenDesktop: async ({ accessToken, refreshToken }: { accessToken: string|null, refreshToken: string|null }) => {
    await ipcRenderer.invoke(`SET${ACCESS_TOKEN_KEY}`, accessToken);
    await ipcRenderer.invoke(`SET${REFRESH_TOKEN_KEY}`, refreshToken);
  },
  getTokenDesktop: async () => {
    const accessToken = await ipcRenderer.invoke(`GET${ACCESS_TOKEN_KEY}`);
    const refreshToken = await ipcRenderer.invoke(`GET${REFRESH_TOKEN_KEY}`);
    return { accessToken, refreshToken };
  },
  deleteTokenDesktop: async () => {
    await ipcRenderer.invoke(`DELETE`);
  },
});