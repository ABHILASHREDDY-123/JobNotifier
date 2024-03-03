const admin = require("../firebase/config");
const jwt = require("jsonwebtoken");
const Users = require("../schemas/userSchema");
const JWT_KEY = "ABHILASH123";


const authController = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log(decodedToken);
        const users = await Users.find({gmail:decodedToken.email});
        let newUser;
        if(users.length === 0){
            newUser = new Users({gmail:decodedToken.email,name:decodedToken.name});
            newUser = await newUser.save();
        }
        else {
            newUser = users[0]
        }
        decodedToken._id = newUser._id;
        const userToken  = jwt.sign(decodedToken,JWT_KEY);
        res.status(200).send({token:userToken,user:decodedToken});
    }
    catch (err) {
        res.status(400).send(err)
    }
}


module.exports = authController;
