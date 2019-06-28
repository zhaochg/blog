const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const ArticleSchema = new Schema({
    username:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    nickname:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:0
    },
    signature:{
        type:String,
        default:0
    },
    position:{
        type:String,
        default:0
    },
    other:{
        type:String,
        default:0
    },


    create_at:{
        type:Date,
        default:Date.now()
    },
    update_at:{
        type:Date,
        default:Date.now()
    },
    delelte_at:{
        type:Date,
        default:null
    },


});

const User = mongoose.model('User', ArticleSchema);
module.exports = User;
