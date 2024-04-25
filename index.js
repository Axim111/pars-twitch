import puppeteer from "puppeteer"
import fs from "fs"



//для скрола
const scrollPageToBottom = async () => {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
};



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



//ищет названия карточке по txt(txt в список выше)
// for (let url of urlMass) {


// await page.goto(url);


// await page.waitForSelector(".tw-image", { visible: true })

// const cards = await page.$$(".tw-link > h2")


// for (let item of cards) {
//   console.log(await item.evaluate((node) => {
//     return node.innerText
//   }))
// }
// }


//csv file


//база
let link = "https://www.twitch.tv/directory"
await page.goto(link);



const itemsOfCard = await page.$$(".tw-card > div")
console.log(itemsOfCard)


//очистка перед записью 
fs.writeFile("stream.csv", 'gameName, gameRef, online\n',
  function (error) {
    if (error) return console.log(error); // если возникла ошибка

    console.log("Запись файла завершена");
  });



//сама запись
for (let i of itemsOfCard) {

  var gameName = null, gaemeImg = null,
    gameRef = null, online = null, streamers = null


  gameName = await i.evaluate((node) => node.querySelector("div  > div > div > span >a").innerText)
  gameRef = await i.evaluate((node) => node.querySelector("a").getAttribute("href"))
  online = await i.evaluate((node) => node.querySelector(".tw-card-body > p > a").innerText)
  console.log(gameName, online, gameRef)



  fs.appendFile("stream.csv", `${gameName.replace(/,/g, ".")},
     ${gameRef.replace(/,/g, ".")},
      ${online.replace(/,/g, ".")}\n`,
    function (error) {
      if (error) return console.log(error); // если возникла ошибка

      console.log("Запись файла завершена");
    });


}


