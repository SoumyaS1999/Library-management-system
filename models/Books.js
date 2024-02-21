const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    adminid: {
        type:Schema.Types.ObjectId,
        ref:"Admin"
    }
    
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;