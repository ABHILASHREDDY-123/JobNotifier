const nodemailer = require("nodemailer")
const Users = require("../schemas/userSchema");
const jobs = require("../schemas/jobSchema");
const { default: axios } = require("axios");
const dotenv = require('dotenv')


dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL;
const senderMail = process.env.SENDER_MAIL;
const senderPass = process.env.SENDER_PASS;


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: senderMail,
        pass: senderPass
    }
});

const mailSender = async (gmail, text) => {

    try {
        let mailOptions = {
            from: senderMail,
            to: gmail,
            subject: 'Job Alert..',
            html: `<h4>${text}</h4>` + `<div style="color:black;">Good News.😎😎, Visit website now.🤩 <button style="background-color:white;text-decoration:none;border-radius:0.5rem;"><a href="${FRONTEND_URL}companies" style="color:black;" >Check Out</a></button></div>`
        }
        let info = await transporter.sendMail(mailOptions);
        if (info.accepted.length) {
            return 1;
        }
        else {
            return 0;
        }
    }
    catch (err) {
        return err;
    }
}


const avaliableCheck = async (job) => {
    const res = await axios.get(job.url);
    let data = res.data;
    for (let j = 0; j < job.properties.length; j++) {
        data = data[job.properties[j]]
    }
    return (data.length >= 0);
}


const mailController = async () => {
    // this takes care of rechecking avaliable jobs in order to send mails for all users
    const gmailMap = new Map();
    const users = await Users.find({});
    const allJobs = await jobs.find({});
    for (let i = 0; i < users.length; i++) {
        gmailMap.set(this.toString(users[i]._id), users[i].gmail);
    }
    const gmails = new Set();
    for (let i = 0; i < allJobs.length; i++) {
        job = allJobs[i];
        const isAvailable = await avaliableCheck(job)
        if (isAvailable) {
            gmails.add(gmailMap.get(this.toString(job.user)))

        }
    }
    let final = [...gmails]
    const text = "New Jobs..."
    const promises = final.map((email) => {
        return mailSender(email, text)
    })
    await Promise.all(promises);
}


module.exports = mailController;


