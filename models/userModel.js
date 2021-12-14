const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    avatarUrl:{
        type: String
    },
    newMessagePopup: {
        type: Boolean,
        default: true
    },
    unreadMessage: {
        type: Boolean,
        default: false
    },
    unreadNotifications:{
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default:'user',
        enum: ['user','root']
    },
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema)