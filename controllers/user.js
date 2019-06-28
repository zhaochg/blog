const User = require('../models/user')
const md5 = require("md5");
const fs = require("fs");
const user = {
    //注册
    add:(req,res,next)=>{
        let users = new User({
            username:req.body.username,
            password:req.body.password,
        });
        users.save();
        res.json({
            'msg':"添加成功"
        })
    },
    //登录
    login:(req,res,next)=>{
        res.render('user')
    },
    doLogin:(req,res,next)=>{
        let username = req.body.name;
        let password = req.body.password;
        User.findOne({username:username}).then(doc=>{
            if(doc){
                let user = doc;
                if(user.password == password){
                    req.session.loginUser = user;
                    console.log("-------------");
                    res.redirect('/')
                }else{
+
                    req.flash('密码错误')
                    res.redirect('/users/login')
                }

            }else{
                req.flash('error','用户名不存在！')
                res.redirect('/users/login')
            }
        })
    },
    logout:(req,res,next)=>{
        req.session.destroy(err=>{
            res.redirect('/users/login')
        })
    },
    //更新信息
    personal:(req,res,next)=>{
        let user = req.session.loginUser;
        console.log(user)
        res.render('personal',{
            user:user
        });
    },
        //修改密码
        update:(req, res, next) => {
            console.log('------------');
            let user = req.session.loginUser;
            user.nickname = req.body.nickname;
            user.signature = req.body.signature;
            user.position = req.body.position;
            user.other = req.body.other;
            let imgData = req.body.imgdata;
            let suffix = req.body.suffix;

            let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");

            //保存编码到缓冲区
            var dataBuffer = new Buffer(base64Data, 'base64');

            if (base64Data) {
                //将缓冲区写入到文件中
                let filename = Date.now()+suffix;
                fs.writeFile("./public/uploads/" + filename, dataBuffer, function (err) {
                    if (err) {
                        res.json({
                            'status': 0,
                            'msg': '修改失败！'
                        })
                    } else {
                        user.avatar = filename;
                        UserModel.update({_id: user._id}, user).then(doc => {
                            res.json({
                                'status': 1,
                                'msg': '修改成功！'
                            })
                        }).catch(err => {
                            res.json({
                                'status': 0,
                                'msg': '修改失败！'
                            })
                        });
                    }
                });
            } else {
                UserModel.update({_id: user._id}, user).then(doc => {
                    res.json({
                        'status': 1,
                        'msg': '修改成功！'
                    })
                }).catch(err => {
                    res.json({
                        'status': 0,
                        'msg': '修改失败！'
                    })
                });
            }

    },
    /**
     * 修改密码
     */
    updatePassword: () => {

    }
}
module.exports = user;