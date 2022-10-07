import { chromium } from "playwright";

//generar resultados de Google

getStatusRealm = async (query)=> {

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://worldofwarcraft.com/es-mx/game/status/classic-us');
    await page.type('input', query);
    await page.keyboard.press('Enter');


    await page.waitForNavigation({waitUntil: 'networkidle'});

    const list = await page.evaluate(()=>{
        let results = [];
        document.querySelectorAll('div[RealmsTable]div[SortTable SortTable--flex]div[SortTable-body]div[SortTable-row]div[SortTable-col SortTable-data align-center]').forEach((anchor, index)=> {

            results.push({
                index: index,
                title: anchor.innerText,
            });
        });
        return results
    });

    console.log(list);
    await browser.close();
}

//visitar resultados y extraer informacion

get