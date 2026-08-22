const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");      //storage engine for Multer that uploads files directly to Cloudinary


cloudinary.config({                                                          //connects app to Cloudinary account using values from .env
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


const storage = new CloudinaryStorage({                                           //creates a storage engine that Multer will use
    cloudinary,
    params: {
        folder: "career-flow",                                                   //Cloudinary will create/use a folder
        allowed_formats: ["jpg", "png", "jpeg", "webp"]
    }
})


module.exports = {cloudinary, storage};                   //cloudinary => Cloudinary package + account credentials, storage => storage engine





















































