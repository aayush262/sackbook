const Router = require('express').Router()
const UserModel = require('./../models/userModel');
const ProfileModel = require('./../models/profileModel');
const FollowerModel = require('./../models/followerModel');
const NotificationModel = require('./../models/notificationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    let token;
    token = jwt.sign(payload, process.env.SECRET_KEY)
    return token;
}

Router.post('/', async (req, res) => {
    const {
        username,
        password,
        email
    } = req.body;
    try {
        const user = await UserModel.findOne({
            email: username.toLowerCase()
        })
        if (user) return res.status(401).json({
            msg: 'Already registered'
        })
        const newUser = new UserModel({});
        newUser.username = username;
        newUser.email = email;
        const passwordHash = await bcrypt.hash(password, 10);
        newUser.password = passwordHash
        const saved = await newUser.save()
        await new ProfileModel({
            user: saved._id,
            bio: ''
        }).save()
        await new FollowerModel({
            user: saved._id,
            followers: [],
            following: []
        }).save()
        await new NotificationModel({
            user: saved._id,
            notifications: []
        }).save()
        const token = createToken({ userId: saved._id })
        return res.status(201).json({
            msg: 'Successfully Registered',
            token
        })

    } catch (err) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})

module.exports = Router