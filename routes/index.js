const express = require('express');
const router = express.Router();
const home = require('../controllers/home')
const upload = require('../library/upload')




/* GET home page. */
//首页
router.get('/', home.index);

//删除
router.post('/upload', upload.single('img'),(req,res,next)=>{
    res.json({
        errno:0,
        data:[
            '/upload/'+req.file.filename
        ]
    })
});

//分类页
router.get('/:category',home.category)



module.exports = router;
