const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config();
const JWT_KEY = process.env.JWT_KEY;

const signInChecker = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_KEY);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err)
    }

}

module.exports = signInChecker;