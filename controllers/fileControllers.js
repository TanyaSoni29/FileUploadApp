
const File = require("../models/file");
const cloudinary = require("cloudinary").v2; 

// localFileupload ---

exports.localfileUpload = async(req, res) => {
    try {
        const file = req.files.file;
        console.log("file",file);

        // kis path pr 
        // date never repeats toh file name hum issi ke according rakhenge..
        let path = __dirname + "/files/" + Date.now() +`.${file.name.split(".")[1]}`; 
        // .${file.name.split(".")[1]} with the help of this we are finding extension of file
       
       console.log("Path-->" , path)
        file.mv(path , (err) =>{
            console.log("error", err)
        }); // path ye server ka hai

        res.json({
            succuss: true,
            message:" Local File Uploaded Successfully."
        })


    } catch (error) {
        console.log("not able to uplaod the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedType) {
   return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
const options = {folder}
if(quality){
    options.quality = quality;

}

options.resource_type = "auto"; 
return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) =>{

    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);

        const supportedType = ["jpg", "jpeg", "png"];
        
        const fileType = file.name.split(".")[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedType)){
           return res.status(400).json({
            success: false,
            message:"File Formate not supported"
           })

       }

       // upload on cloudinary 
        const response = await uploadFileToCloudinary(file, "T_Folder")
        console.log(response);

        const fileData = await File.create({
            name,
            email,
            tags,
            imgUrl: response.secure_url
        })

        res.json({
            success:true,
            imgUrl: response.secure_url,
            message:"Image Uploaded Successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}


exports.videoUpload = async(req,res) =>{
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.videoFile;

        const supportedType = ["mp4", "mov"];
        
        const fileType = file.name.split(".")[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedType)){
           return res.status(400).json({
            success: false,
            message:"File Formate not supported"
           })

       }

       const response = await uploadFileToCloudinary(file, "T_Folder")
       console.log(response);
        
       const fileData = await File.create({
        name,
        email,
        tags,
        videoUrl: response.secure_url
    })

    res.json({
        success:true,
        videoUrl: response.secure_url,
        message:"Video Uploaded Successfully"
    })



    } catch(err) {
        console.log(err)
        res.json({
            success:false,
            message:"Something went wrong during Uploading video"
        })
    }

}

exports.imageReducerUpload = async(req, res) =>{

    try {

        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imgFile;

        const supportedType = ["jpg", "jpeg", "png"];
        
        const fileType = file.name.split(".")[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedType)){
           return res.status(400).json({
            success: false,
            message:"File Formate not supported"
           })

       }

       // upload on cloudinary 
        const response = await uploadFileToCloudinary(file, "T_Folder", 30)
        console.log(response);

        const fileData = await File.create({
            name,
            email,
            tags,
            imgUrl: response.secure_url
        })

        res.json({
            success:true,
            imgUrl: response.secure_url,
            message:"Image Uploaded Successfully"
        })


        
    } catch (err) {
        console.log(err)
        res.json({
            success:false,
            message:"Something went wrong during Uploading video"
        }) 
    }
}
