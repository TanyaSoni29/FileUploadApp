const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();
 
const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        // required: true
       
    },
    videoUrl:{
     type: String
    },
    tags:{
        type: String,
        // required: true
    },
    email:{
        type: String,
        // required: true
    }
    
})

fileSchema.post("save", async function(doc) {
     try {
        console.log("Doc-->", doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST ,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        // best practice put above tranporter configuration on config folder creating a file like nodeMailer.js

        // mail send

        let info = await transporter.sendMail({
            from: "Tanya",
            to: doc.email,
            subject: "New File uploaded on Cloudinary",
            html: `<h2>Hello Ji!</h2> <p>File uploaded View here: <a href=${doc.imgUrl} > ${doc.imgUrl} </a></p>`
        })
        console.log(info);

     } catch (error) {
        console.log(error);
     }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;