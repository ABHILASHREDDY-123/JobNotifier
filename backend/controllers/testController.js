const axios = require("axios");
const PYTHON_END_POINT = process.env.PYTHON_END_POINT

const testController = async (req,res)=>{
      const body = req.body;
      try {
            if(body.test === "api"){
                  const res1 = await axios.get(body.url)
                  res.send(res1.data);
            }
            else {
                 const res1 = await axios.post(PYTHON_END_POINT,{url:body.url});
                 return res.send(res1.data);
            //    const browser  =  await puppeteer.launch({headless:false}) 
            //    const page = await browser.newPage();
            //    await page.goto(body.url,{ waitUntil: 'networkidle2' });
            //    await page.waitForSelector("div.ms-List-cell");
            //    await page.$('div.ms-List-cell');
            //    console.log(page);
            //    const all = await page.evaluate(()=>{
            //       return document.querySelectorAll("div.ms-List-cell");
            //    })
            //    console.log(all);
            // //    await browser.close();
               res.send("success");
            }
      }
      catch(err){
            console.log(err);
         res.status(400).send(err);
      }
}

module.exports  = testController;