const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const borrowedbookSchema = new mongoose.Schema({
    name: String,
    author:String,
    price: Number,
    adminid: {
        type:Schema.Types.ObjectId,
        ref:"Admin"
    },
    userid: {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    bookid:{
        type:Schema.Types.ObjectId,
        ref:"Book"
    },
    username:String

    
});

const Borrowedbook = mongoose.model('Borrowedbook', borrowedbookSchema);

module.exports = Borrowedbook;