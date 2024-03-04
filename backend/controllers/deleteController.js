const jobs = require("../schemas/jobSchema");


const deleteController  = async (req,res)=>{
    try {
        const _id = req.params._id;
       const resp = await jobs.findById(_id);
       if(resp){
        if(resp.user == req.user._id){
          await resp.deleteOne();
          res.status(200).send({message:"Deleted!!"});
        }
        else {
            res.status(401).send({message:"Unauthorized"});
        }
       }
       else {
        res.status(404).send({message:"Can't delete"})
       }
    }
    catch(err){
         res.status(400).send(err);
    }
}

module.exports = deleteController;