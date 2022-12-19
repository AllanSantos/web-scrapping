const puppeteer = require("puppeteer"); // importe o pacote puppeteer

let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  }); // cria um browser. A propriedade headless define se o browser irá abrir com interface gráfica ou se apenas irá executar em segundo plano, sem GUI. false = irá abrir interface gráfica; true = não irá abrir interface gráfica

  const page = await browser.newPage(); // cria uma nova aba no navegador acima

  page.setDefaultTimeout(50000);

  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });

  console.log("Acessando pagina: 'https://server.growatt.com/login'");

  await page.goto("https://server.growatt.com/login"); // define a página que queremos acessar e a função goto navega até essa página

  console.log("Fazendo login:");

  await page.type('[id="val_loginAccount"]', "CanadianSolar2022");

  await page.type('[id="val_loginPwd"]', "CanadianSolar2022");

  const btnLogin = await page.waitForSelector("button.hasColorBtn.loginB", {
    visible: true,
  });

  await btnLogin.click();

  // await page.waitForSelector(".deviceBox > table > tbody > tr");

  // await page.$$eval(".deviceBox > table > tbody > tr", (el) => {
  //   el.map((a) => {
  //     console.log(a);
  //   });
  // });

  console.log("Executando scrapping de componente:");

  await page.waitForSelector(".deviceBox");

  const dataObj = {};

  dataObj["table"] = await page.$$eval(
    ".deviceBox > table > tbody > tr > td",
    (table) => {
      return table.map((t) => t.textContent);
    }
  );

  console.log(dataObj);

  browser.close();

  /* let dataObj = [];

  await page.$$eval(".deviceBox > table > tbody > tr > td", (table) => {
    table.map((t) => {
      dataObj.push({
        title: t.childNodes[0].textContent,
        text: t.childNodes[1].textContent,
      });
    });
  }); */

  //await page.$eval('button[name="login"]', (form) => form.click());

  //browser.close(); // fecha o browser, indicando que finalizamos o scraping
};

scrape()
  .then((value) => {})
  .catch((error) => console.log(error));
