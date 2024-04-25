import puppeteer from "puppeteer"
import fs from "fs"

let urlList = fs.readFileSync("url.txt", "utf8", async (err, text) => {
  if (err) throw new Error("Что-то пошло не так!");

})

let urlMass = []
for (let i of urlList.split("\n")) {
  urlMass.push(i)
}


const browser = await puppeteer.launch(
  {
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: false,
  }
);
const page = await browser.newPage();
for (let url of urlMass) {


  await page.goto(url);


  await page.waitForSelector(".tw-image", { visible: true })

  const cards = await page.$$(".tw-link > h2")
  // page.on("request",(req)=>{
  //   console.log(req.url)
  // })




  for (let item of cards) {
    console.log(await item.evaluate((node) => {
      return node.innerText
    }))
  }

  //csv file

  // let link = "https://www.twitch.tv/directory"
  // await page.goto(link);
  // const itemsOfCard = await page.$$("game-card__link")
  // for (let i in itemsOfCard) {
  //   console.log(await i.evaluate((node) => node.getAttribute("game-card__link")))
  // }


}