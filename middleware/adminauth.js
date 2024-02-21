const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const admin = jwt.verify(token, 'secretkey');
       // console.log('userID >>>> ', user.userId)
        Admin.findById(admin.adminId).then(admin => {

            req.admin = admin; ///ver
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }

}

module.exports = {
    authenticate
}