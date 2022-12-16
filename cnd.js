const puppeteer = require("puppeteer"); // importe o pacote puppeteer

let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  }); // cria um browser. A propriedade headless define se o browser irá abrir com interface gráfica ou se apenas irá executar em segundo plano, sem GUI. false = irá abrir interface gráfica; true = não irá abrir interface gráfica

  const page = await browser.newPage(); // cria uma nova aba no navegador acima

  page.setDefaultTimeout(50000);

  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });

  await page.goto("https://monitoring.csisolar.com/login"); // define a página que queremos acessar e a função goto navega até essa página

  // await page.evaluate(() => {
  //   document.querySelector("button.functionBtn.tra-fast::after").click();
  // });

  await page.$eval(
    "div.window.window-bg.window-alert.window-lock",
    (e, randomDate) => {
      e.setAttribute("status", true), randomDate;
    }
  );

  await page.type('[name="eMail"]', "samuel.ovanessian@canadiansolar.com");

  await page.type('[name="password"]', "Ohanessian2787");

  const btnLogin = await page.waitForSelector('[name="login"]', {
    visible: true,
  });
  console.log(btnLogin);
  await btnLogin.click();

  //await page.$eval('button[name="login"]', (form) => form.click());

  //browser.close(); // fecha o browser, indicando que finalizamos o scraping
};

scrape()
  .then((value) => {})
  .catch((error) => console.log(error));
