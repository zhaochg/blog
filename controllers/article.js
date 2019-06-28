const ArticleModel = require('../models/article')
const CategoryModel = require('../models/category')
const article = {
    // 列表
    index:(req,res,next)=>{
        //搜索关键字
        let key = req.query.key;
        let regex = new RegExp(key);
        let count = 0;
        let limit = 2;
        let page = req.query.page;
        let totalPage = 0;
        let where = {};
        if(key) {
            where = {title: {$regex: regex}};
        }
        ArticleModel.find(where).count().then(doc=>{
            count = doc;
            console.log(count);
            totalPage = Math.ceil(count/limit);
            //skip查看的起始点
            ArticleModel.find(where).skip((page-1)*limit).limit(2).sort({create_at:"desc"}).then(doc=>{
                res.json(doc);
            })
        })
    },
    get:(req,res,next)=>{
    // 获取单页
    },
    // 保存
    save:(req,res,next)=>{
        let articleModel = new ArticleModel({
            title:req.body.title,
            content:req.body.content,
            author:req.body.author,
            is_jing:req.body.is_jing,
            status:req.body.status,
            img:req.file.filename,
            category_id:req.body.category_id,
            // user_id:req.body.category_id,
        });
        articleModel.save();
        res.redirect('/')
    },
    // 更新
    update:(req,res,next)=>{
        let id = req.params.id;
        ArticleModel.update({_id:id},{
            title:req.body.title,
            content:req.body.content,
            author:req.body.author,
            is_jing:req.body.is_jing,
            status:req.body.status,
            img:'',
        }).then(doc=>{
            res.json(doc)
        })
    },
    // 删除
    del:(req,res,next)=>{
        let id = req.params.id;
        ArticleModel.remove({_id:id}).then(doc=>{
            res.json(doc)
        })
    },
    add:(req,res,next)=>{
            CategoryModel.find({is_sys:1}).then(doc=>{
                res.render('fore',{category:doc})
            })
    },
}
module.exports = article;