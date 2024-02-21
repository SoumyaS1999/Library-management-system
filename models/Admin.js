const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;