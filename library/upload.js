// 文件上传
const path = require('path');

const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(JSON.stringify(file));
        cb(null,path.join(__dirname,"..","public/uploads"));
    },
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})


const upload = multer({
    storage: storage
});

module.exports = upload;