const express = require("express");
const app = express();


require("dotenv").config();
const PORT = process.env.PORT || 4000

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
   
    useTempFiles: true,
    tempFileDir: "/temp/"
}));



require("./config/database").connect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const router = require("./routes/fileUpload")
app.use("/api/v1/upload", router);

app.listen( PORT, () => {
    console.log(`App Listening at ${PORT}`)
})