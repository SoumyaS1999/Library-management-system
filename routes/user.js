const express= require('express');

const router= express.Router();

const userController= require('../controller/user');
const userauthentication = require('../middleware/userauth')

router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/get-books',userController.getbooks)
router.post('/add-to-cart/:id',userauthentication.authenticate,userController.addtocart)
router.get('/get-borrowed-books',userauthentication.authenticate,userController.getborrowedbooks)
router.post('/return-book/:id',userauthentication.authenticate,userController.returnbook)
router.get('/get-returned-books',userauthentication.authenticate,userController.getreturnedbooks)

module.exports = router;