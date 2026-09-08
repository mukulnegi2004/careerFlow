const multer = require("multer");                    //receive files from incoming requests, process them and pass file information to req.file
const {storage} = require("../config/cloudinary");

const upload = multer({
    storage
})


module.exports = upload;
