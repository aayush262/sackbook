const router = require("express").Router();
const UserModel = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddleware");

const createToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
}

router.get('/', authMiddleware , async (req, res, next) => {
    const userId = req.userId
    try {
        const user = await UserModel.findById(userId)
        if (!user) return res.status(401).json({
            msg: 'User not found'
        })
        return res.status(201).json({
            msg: 'User found',
            user
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({
            email: email.toLowerCase()
        }).select("+password")
        if (!user) return res.status(401).json({
            msg: 'Invalid credentials'
        })
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return res.status(401).json({
            msg: "Invalid credentials"
        })
        const token = createToken({ userId: user._id })
        return res.status(201).json({
            msg: 'Successfully logged in',
            token
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})

module.exports = router;
