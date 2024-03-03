const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true 
    },
    properties:{
        type:[String],
        required:true
    },
    company:{
        type:String,
        required:true
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
});


const jobs = mongoose.model("jobs",jobSchema);
module.exports = jobs;