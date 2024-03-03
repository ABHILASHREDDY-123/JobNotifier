const axios = require("axios");

const testController = async (req,res)=>{
      const body = req.body;
      const res1 = await axios.get(body.url)
      res.send(res1.data);
}

module.exports  = testController;