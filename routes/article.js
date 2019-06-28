var express = require('express');
var router = express.Router();

const article = require('../controllers/article')
const upload = require('../library/upload')
const suth = require('../middle/suth')
/* GET users listing. */
//获取文章
router.get('/',article.index);

router.get('/add',suth,article.add);
// 添加文章
router.post('/add',suth,upload.single('img'),article.save);



//更新文章
router.get('/update/:id',article.update)

//删除文章
router.get('/delete/:id',article.del)
module.exports = router;
