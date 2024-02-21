const Admin = require('../models/Admin');
const User = require('../models/User');
const Borrowedbook= require('../models/Borrowedbooks');
const Returnedbook= require('../models/Returnedbooks');
const Book= require('../models/Books')
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {

        try {
            const { name, email, password } = req.body;
            //console.log(name,email,password)

            await Admin.create({ name, email, password });
            res.status(201).json({ message: 'Successfully create new user' });

        } catch (error) {
            
            res.status(500).json({ error: error.message });
        }
       
   
};

const generateAccessToken = (id, name) => {
    return jwt.sign({ adminId: id, name}, 'secretkey');
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail id or Password is missing', success: false });
        }

        const admin = await Admin.findOne({ email });

        if (admin) {

                if (password === admin.password) {
                    res.status(200).json({
                        success: true,
                        message: 'User Logged in successfully',
                        token: generateAccessToken(admin._id, admin.name)
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

const addbooks= async(req,res)=>{
    try {
        const { name, author, price } = req.body;
        //console.log(name,email,password)
        const admin= req.admin;
        const adminid=admin._id;
        console.log(adminid);

        const Books= await Book.create({ name, author, price,adminid});
        res.status(202).json({bookdetails: Books});

    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }

};

const getbooks=async(req,res)=>{
    try {
        const admin= req.admin;
        const adminid=admin._id;
        const books = await Book.find({adminid:adminid})
        res.status(200).json({allBooks: books});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const getborrowedbooks=async(req,res)=>{
    try {
        const admin = req.admin;
        const adminid = admin._id;
        
        const books = await Borrowedbook.find({adminid:adminid})
        res.status(200).json({allBooks: books});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getreturnedbooks=async(req,res)=>{
    try {
        const admin = req.admin;
        const adminid = admin._id;
        
        const books = await Returnedbook.find({adminid:adminid})
        res.status(200).json({allBooks: books });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const editbooks= async(req,res)=>{
    try{
        if(req.params.id=='undefined'){
          console.log('ID is missing')
          return res.status(400).json({err:'ID is missing'})
        }
      const Id=req.params.id;
      await Book.deleteOne({_id:Id});
      res.sendStatus(200);
      }catch(err){
        console.log(err);
        res.status(500).json(err)
      }
}

module.exports = {
    signup,
    login,
    addbooks,
    getbooks,
    getborrowedbooks,
    getreturnedbooks,
    editbooks
};
