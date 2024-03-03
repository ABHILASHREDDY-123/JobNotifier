const jwt = require("jsonwebtoken")
const JWT_KEY = "ABHILASH123";

const signInChecker =  (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,JWT_KEY);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }

}

module.exports = signInChecker;