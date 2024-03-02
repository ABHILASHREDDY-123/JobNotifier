const admin = require("../firebase/config");

const authController = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.status(200).send(decodedToken);
    }
    catch (err) {
        res.status(400).send(err)
    }
}
module.exports = authController;
