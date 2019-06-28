var express = require('express');
var router = express.Router();

const category = require('../controllers/category')


/* GET users listing. */
//获取
router.get('/',category.index);
// 添加
router.get('/add',category.save);

//更新
router.get('/update/:id',category.update)

//删除
router.get('/delete/:id',category.delete)
module.exports = router;