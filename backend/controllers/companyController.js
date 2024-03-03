const jobs = require("../schemas/jobSchema");
const axios = require("axios");

const companyController = async (req,res) => {
    try {
        userJobs =  await jobs.find({user:req.user._id})
        console.log(userJobs);
        const promises = userJobs.map(async (u)=>{
            const resp = await  axios.get(u.url);
            let data = resp.data;
            for(let i=0;i<u.properties.length;i++){
                data = data[u.properties[i]]
            }
            return (data && data.length>0);
        })
        const results = await Promise.all(promises);
        res.send({jobs:userJobs,results});
    }
    catch(err){
       console.log(err)
       res.status(400).json(err);
    }
}

module.exports  = companyController;