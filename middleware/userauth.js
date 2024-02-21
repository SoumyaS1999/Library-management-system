const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log('Received token:', token);
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }

        const user = jwt.verify(token, 'secretkey');
        console.log('Decoded token:', user.userId);

        User.findById(user.userId).then(user => {

          req.user = user; ///ver
          next();
      })


    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = {
    authenticate
};
