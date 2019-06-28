var express = require('express');
var router = express.Router();
const user = require('../controllers/user')
const auth = require("../middle/suth");

/* GET users listing. */
//注册
router.get('/add',user.add);
//登录
router.get('/login',user.login);

router.post('/login',user.doLogin);
//登出
router.get('/logout',user.logout);
//个人中心
router.get('/personal',user.personal);
module.exports = router;
