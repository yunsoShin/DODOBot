
import puppeteer from "puppeteer";

const autoSpeedGo = async (req, res)=>{
  const browser = await puppeteer.launch(); // headless: false로 설정하여 GUI 모드로 실행
  // const page = await browser.newPage();
  // const pageURL = "https://speedgo.domeggook.com"
  // // 특정 URL로 이동합니다.
  //   await page.goto(pageURL);
  //   console.log("페이지 로드가 완료되었습니다 :", pageURL )
  console.log("!!")
  res.status(200).json({ message: '페이지 로드성공' });
    return res
  
}


export default autoSpeedGo


