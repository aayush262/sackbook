const router = require('express').Router();
const UserModel = require('./../models/userModel');
const FollowerModel = require('./../models/followerModel');
const ProfileModel = require('./../models/profileModel');
const authMiddleware = require('../middlewares/authMiddleware');
const PostModel = require('./../models/postModel');
const bcrypt = require('bcrypt');

router.get('/:username', authMiddleware, async (req, res, next) => {
    const { username } = req.params;
    try {
        const user = await UserModel.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                msg: 'User not found'
            })
        }
        const profile = await ProfileModel.findOne({ user: user._id })
            .populate('user');
        if (!profile) return res.status(401).json({
            msg: 'Profile not found'
        })
        const followerStats = await FollowerModel.findOne({ user: user._id });
        return res.status(201).json({
            profile,
            followerStats
        })

    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.get('/post/:username', authMiddleware, async (req, res, next) => {

    const { username } = req.params;
    try {
        const user = await UserModel.findOne({ username: username.toLowerCase() });
        if (!user) return res.status(401).json({
            msg: 'User not found'
        })
        const posts = await PostModel.find({
            user: user._id
        }).sort({
            createdAt: -1
        }).populate('user')
            .populate('comments.user')
        return res.status(201).json({
            msg: 'Posts found',
            posts
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.put('/update', authMiddleware, async (req, res, next) => {

    const userId = req.userId;
    try {
        let updatedProfile = {
            user: userId
        };
        const { bio, avatarUrl } = req.body;
        if (bio) updatedProfile.bio = bio;
        const saved = await ProfileModel.findOneAndUpdate({
            user: userId
        }, {
            $set: updatedProfile
        }, {
            new: true
        })
        if (avatarUrl) {
            const user = await UserModel.findbyId(UserId);
            user.avatarUrl = avatarUrl;
            await user.save()
        }
        return res.status(201).json({
            msg: 'Successfully Updated'
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//UPDATE PASSOWORD

router.post('/settings/password', authMiddleware, async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await UserModel.findById(req.userId).select('+password');
        const isPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isPassword) return res.status(401).json({
            msg: 'Invalid Password'
        })
        user.password = await bcrypt.hash(newPassword, 10);
        const saved = await user.save()
        return res.status(201).json({
            msg: 'Password Changed Successfully',
            saved
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//POP UP UPDATE

router.post('/settings/messagepopup', authMiddleware, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (user.newMessagePopup) {
            user.newMessagePopup = false;
            await user.save()
        } else {
            user.newMessagePopup = true;
            await user.save()
        }
        return res.status(201).json({
            msg: "Succesfully changed"
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})


module.exports = router;