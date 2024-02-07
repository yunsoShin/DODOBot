import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("https://speedgo.domeggook.com/");
    mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`https://speedgo.domeggook.com/`);
    mainWindow.webContents.openDevTools();
    
  }
 await mainWindow.webContents.executeJavaScript(`
    const loginLink = document.querySelector('a.a1[href*="mem_formLogin.php"]');
    if (loginLink) {
      loginLink.click();
    } else {
      console.error('Login link not found');
    }
  `);
  await mainWindow.webContents.executeJavaScript(`
  const naverLoginLink = document.querySelector('#lSnsLinkNaver a');
  if (naverLoginLink) {
    naverLoginLink.click();
  } else {
    console.error('Naver login link not found');
  }
`);

})();


app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
