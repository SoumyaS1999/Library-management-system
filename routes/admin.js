const express= require('express');

const router= express.Router();

const adminController= require('../controller/admin');
const adminauthentication = require('../middleware/adminauth')

router.post('/signup',adminController.signup);
router.post('/login',adminController.login);
router.post('/add-books',adminauthentication.authenticate,adminController.addbooks);
router.get('/get-books',adminauthentication.authenticate,adminController.getbooks);
router.get('/get-borrowed-books',adminauthentication.authenticate,adminController.getborrowedbooks);
router.get('/get-returned-books',adminauthentication.authenticate,adminController.getreturnedbooks);
router.delete('/edit-books/:id',adminController.editbooks);

module.exports = router;