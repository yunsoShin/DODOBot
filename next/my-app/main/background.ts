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
    await mainWindow.loadURL("app://./home");
    await mainWindow.loadURL(`https://speedgo.domeggook.com/`);
    mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`https://speedgo.domeggook.com/`);

    //await mainWindow.loadURL(`https://speedgo.domeggook.com/`);
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
  //  await mainWindow.loadURL('app://./home') 해당 라우트는 메인페이지가 된다.
})();
//이후 로딩이 끝나면 모든버튼을 차례로 클릭하고 만약 상품이 팔렸다면 메세지를 보내는데,네이버 최저가 가격과 상품링크와 판매한 링크의 이미지, 그리고 상세페이지가 같다면 가격비교를 통해 최저가 가 얼마고 현재 판매
//된 제품의 가격을 빼서, 얼마만큼의 차익을 벌 수 있는지 분석하고 , 그것을 핸드폰 메세지로 SMS문자로 보내주는 식, 만약 클라이언트가 메세지 발송 후 , 6시간이내, 혹은 택배사 발송시간인 2시 이내에 확인하지않는다면 , 자동으로 결제가 되어서
//제품을 구매 및 위탁할 수 있도록 비지니스로직을 구성한다.

//1. 도매 및 소매트에서 제공하는 스피드고의 자동화를 이룬다. 이것첫번째 과제.
//2. 자동화를 이뤘다면 이익을 극대화 하기위해서 해당 제품의 진짜최저가를 찾고 해당 최저가의 차익을 클라이언트에게 보내줌
//3. cron을 이용해 운영체재의 절대적인 시각을 판단하고 , 택배사의 발송시간에 맞춰서 최단기간에 발송을 할 수 있도록
//결제및 발송 자동화를  구성
//4.판매된 모든목록은 수파베이스를 통해서 저장되며 통계치와 판매된 상품목록들을 제공한다.
//5.CI / CD를 구성한다.
app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
