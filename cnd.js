const puppeteer = require("puppeteer"); // importe o pacote puppeteer
const fs = require("fs"); // importe o pacote fs

let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  }); // cria um browser. A propriedade headless define se o browser irá abrir com interface gráfica ou se apenas irá executar em segundo plano, sem GUI. false = irá abrir interface gráfica; true = não irá abrir interface gráfica

  const page = await browser.newPage(); // cria uma nova aba no navegador acima

  page.setDefaultTimeout(500000);

  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });

  await page.goto("https://monitoring.csisolar.com/login"); // define a página que queremos acessar e a função goto navega até essa página

  await page.waitForSelector(
    "#app > div.frame-login > div:nth-child(3) > div > div.upDown > button.functionBtn.tra-fast"
  );

  await page.click(
    "#app > div.frame-login > div:nth-child(3) > div > div.upDown > button.functionBtn.tra-fast"
  );

  await page.type('[name="eMail"]', "samuel.ovanessian@canadiansolar.com");

  await page.type('[name="password"]', "Ohanessian2787");

  const btnLogin = await page.waitForSelector('[name="login"]', {
    visible: true,
  });

  console.log(btnLogin);

  await btnLogin.click();

  // Espera a página carregar totalmente.
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  const potatual = await page.$eval(
    "#app > div:nth-child(5) > div.frame-main > section > div > section > div:nth-child(3) > div:nth-child(1) > div.posR.h32x.article1 > div:nth-child(2) > div.tableSys.h30x.vaM_E > div.w18x.pl2x > div > div.w16x.h16x.pl3x.pr3x.h48pct_E.posA.tableSys > div > div.bd_bottom.taC.cMain.mb05x.mb05x_E > div:nth-child(1)",
    (potatual) => potatual.innerText
  );

  const potinstal = await page.$eval(
    "#app > div:nth-child(5) > div.frame-main > section > div > section > div:nth-child(3) > div:nth-child(1) > div.posR.h32x.article1 > div:nth-child(2) > div.tableSys.h30x.vaM_E > div.w18x.pl2x > div > div.w16x.h16x.pl3x.pr3x.h48pct_E.posA.tableSys > div > div.taC.cSub.mt05x.mb05x_E > div:nth-child(1)",
    (potinstal) => potinstal.innerText
  );

  const proddiaria = await page.$eval(
    "#app > div:nth-child(5) > div.frame-main > section > div > section > div:nth-child(3) > div:nth-child(1) > div.posR.h32x.article1 > div:nth-child(2) > div.tableSys.h30x.vaM_E > div:nth-child(2) > div.dpIB_E.w45pct_E.mb2x > div:nth-child(1) > div.mb05x",
    (proddiaria) => proddiaria.innerText
  );

  const prodmensal = await page.$eval(
    "#app > div:nth-child(5) > div.frame-main > section > div > section > div:nth-child(3) > div:nth-child(1) > div.posR.h32x.article1 > div:nth-child(2) > div.tableSys.h30x.vaM_E > div:nth-child(2) > div.dpIB_E.w45pct_E.mb2x > div:nth-child(2) > div.mb05x",
    (prodmensal) => prodmensal.innerText
  );

  const prodanual = await page.$eval(
    "#app > div:nth-child(5) > div.frame-main > section > div > section > div:nth-child(3) > div:nth-child(1) > div.posR.h32x.article1 > div:nth-child(2) > div.tableSys.h30x.vaM_E > div:nth-child(2) > div.dpIB_E.w45pct_E.textCut_E > div:nth-child(1) > div.mb05x",
    (prodanual) => prodanual.innerText
  );

  const prodtotal = await page.$eval(
    "#app > div:nth-child(5) > div.frame-main > section > div > section > div:nth-child(3) > div:nth-child(1) > div.posR.h32x.article1 > div:nth-child(2) > div.tableSys.h30x.vaM_E > div:nth-child(2) > div.dpIB_E.w45pct_E.textCut_E > div:nth-child(2) > div.mb05x",
    (prodtotal) => prodtotal.innerText
  );

  // Organiza os dados obtidos.
  const table = {
    potatual,
    potinstal,
    proddiaria,
    prodmensal,
    prodanual,
    prodtotal
  };

  const proddata = [];

  proddata.push(table);

  // Insere os dados em um arquivo JSON.
  try {
    fs.writeFileSync(
      "proddata.json",
      JSON.stringify({data:proddata}, null, 4),
      console.log("Dados obtidos e atualizados.")
    )
  } catch (error) {
    console.log(error);
  }
  
  await browser.close(); // fecha o browser, indicando que finalizamos o scraping
};

scrape()
  .then((value) => {})
  .catch((error) => console.log(error));
  