const jobs = require("../schemas/jobSchema");


const addController = async (req, res) => {

    try {
        resultJobs = await jobs.findOne({company:req.body.company,url:req.body.url,properties:req.body.properties,user:req.user._id});
        if(resultJobs){
            res.send({message:"Already Exists"})
        }
        else {
        const newJob = new jobs({company:req.body.company,url:req.body.url,properties:req.body.properties,user:req.user._id})
        await newJob.save();
        res.send({ message: "Add Successful" })
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }

}

module.exports = addController;