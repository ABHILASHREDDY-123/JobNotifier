const express = require("express")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/jobNotifier"

mongoose.connect(DB_URL).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log("Error in Database Connection")
})

const authController = require("./controllers/authController");
const testController = require("./controllers/testController");
const signInChecker = require("./middlewares/auth");
const addController = require("./controllers/addController");
const companyController = require("./controllers/companyController");


const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());


app.use("/auth", authController);
app.use("/test",signInChecker,testController);
app.use("/add",signInChecker,addController);
app.use("/companies",signInChecker,companyController);



app.listen(8000,()=>{
    console.log("Server is running...");
})