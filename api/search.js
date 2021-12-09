const router = require('express').Router();
const UserModel = require('./../models/userModel');
const authMiddleware = require('./../middlewares/authMiddleware');

router.get('/:search', authMiddleware, async (req, res, next) => {
    const searchQuery = req.params.search;
    const userPattern = new RegExp(`^${searchQuery}`);
    try {
        const users = await UserModel.find({
            username: {
                $regex: userPattern,
                $options: 'i'
            }
        })
        if (users.length === 0) {
            return res.status(401).json({
                msg: "No such user"
            })
        }
        return res.status(201).json({
            msg: 'Users found',
            users
        })
    } catch (err) {
        return res.status(500).json({
            msg: "Server Error"
        })
    }
})

module.exports = router;