const mongoose = require('mongoose');
const validator = require('validator')
const roles = require('../utils/roles');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Field must be a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [roles.USER, roles.ADMIN, roles.MANAGER],
        default: roles.USER
    },
    avatar:{
        type: String,
        default: 'uploads/profile.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);