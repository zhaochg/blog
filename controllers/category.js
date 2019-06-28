const categoryModel = require('../models/category');

const Category = {
    index:(req,res,next)=>{//正序 asc
        categoryModel.find().sort({sort:"desc"}).then(doc=>{
            res.json(doc);
        })
    },
    save:(req,res,next)=>{
        let category = new categoryModel( {
            name:req.body.name,
            path:req.body.path,
            template:req.body.template,
            sort:req.body.sort,
            is_sys:req.body.is_sys,
            is_nav:req.body.is_nav
        });
        category.save();
        console.log('添加成功');
        res.json({title:'添加成功'});
    },
    update:(req,res,next)=>{
        let id= req.params.id;
        categoryModel.update({_id:id},{
            name:req.body.name,
            path:req.body.path,
            template:req.body.template,
            sort:req.body.sort,
            is_sys:req.body.is_sys,
            is_nav:req.body.is_nav
        }).then(doc=>{
            res.json(doc);
        })
    },
    delete:(req,res,next)=>{
        let id= req.params.id;
        categoryModel.remove({_id:id}).then(doc=>{
            res.json(doc);
        })
    }

}

module.exports = Category;
