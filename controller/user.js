const User = require('../models/User');
const Book = require('../models/Books');
const Borrowedbook= require('../models/Borrowedbooks');
const Returnbook=require('../models/Returnedbooks');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {

        try {
            const { name, email, password } = req.body;
            console.log(name,email,password)

            await User.create({ name, email, password });
            res.status(201).json({ message: 'Successfully create new user' });

        } catch (error) {
            
            res.status(500).json({ error: error.message });
        }
       
   
};

const generateAccessToken = (id, name) => {
    return jwt.sign({ userId: id, name}, 'secretkey');
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail id or Password is missing', success: false });
        }

        const user = await User.findOne({ email });

        if (user) {

                if (password === user.password) {
                    res.status(200).json({
                        success: true,
                        message: 'User Logged in successfully',
                        token: generateAccessToken(user._id, user.name)
                    });
                } else {
                    return res.status(400).json({ success: false, message: 'Password is Incorrect' });
                }
        } else {
            return res.status(404).json({ success: false, message: 'User Does not exist' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

const getbooks=async(req,res)=>{
    try {
        
        const books = await Book.find()
        res.status(200).json({allBooks: books});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const addtocart = async (req, res) => {
    try {
        const bookid = req.params.id;
        const books = await Book.find({ _id: req.params.id });

        if (books.length > 0) { // Check if any books found
            const book = books[0]; // Assuming you want the first book found

            const bookauthor = book.author;
            const bookprice = book.price;
            const bookadmin =book.adminid;
            //const bookid=book._id;
            const bookname=book.name

            const user = req.user;
            const userid = user._id;
            const username= user.name;

            const addtocart = await Borrowedbook.create({
                name: bookname,
                author: bookauthor,
                adminid:bookadmin,
                price: bookprice,
                bookid:bookid,
                username:username,
                userid
            });

            console.log(bookauthor, bookprice);
        } else {
            console.log("Book not found");
            // Handle scenario where the book is not found
        }
    } catch (err) {
        console.log(err);
        // Handle other errors
    }
}

const getborrowedbooks=async(req,res)=>{
    try {
        const user = req.user;
        const userid = user._id;
        
        const books = await Borrowedbook.find({userid:userid})
        res.status(200).json({allBooks: books});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const returnbook= async(req,res)=>{
    try {
        const bookid = req.params.id;
        const books = await Borrowedbook.find({ bookid: bookid });

        if (books.length > 0) { 
            const book = books[0]; 

            const bookauthor = book.author;
            const bookprice = book.price;
            const bookadmin =book.adminid;
            //const bookid=book._id;
            const bookname=book.name;

            const user = req.user;
            const userid = user._id;
            const username=user.name;

            const addtolist = await Returnbook.create({
                name: bookname,
                author: bookauthor,
                adminid:bookadmin,
                price: bookprice,
                bookid:bookid,
                username:username,
                userid
            });
            await Borrowedbook.deleteOne({name:bookname});

            console.log(bookauthor, bookprice);
        } else {
            console.log("Book not found");
        
        }
    } catch (err) {
        console.log(err);
        
    }

}
const getreturnedbooks=async(req,res)=>{
    try {
        const user = req.user;
        const userid = user._id;
        
        const books = await Returnbook.find({userid:userid})
        res.status(200).json({allBooks: books});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}




module.exports = {
    signup,
    login,
    getbooks,
    addtocart,
    getborrowedbooks,
    returnbook,
    getreturnedbooks
};
