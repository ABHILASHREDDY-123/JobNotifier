const express = require("express")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const authController = require("./controllers/authController");


const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());



app.use("/auth", authController);




app.listen(8000,()=>{
    console.log("Server is running...");
})