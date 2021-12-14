const router = require('express').Router();
const UserModel = require('./../models/userModel');
const FollowerModel = require('./../models/followerModel');
const ProfileModel = require('./../models/profileModel');
const authMiddleware = require('../middlewares/authMiddleware');
const PostModel = require('./../models/postModel');
const bcrypt = require('bcrypt');
const { newFollowerNotification,
    removeFollowerNotification } = require('./../utilServer/notificationAction');
const notificationModel = require('../models/notificationModel');

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

//GET FOLLOWERS OF A USER
router.get('/followers/:userId', authMiddleware, async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await FollowerModel.findOne({ user: userId })
            .populate('followers.user');
        return res.status(201).json({
            followers: user.followers
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//GET FOLLOWINGS OF A USER
router.get('/following/:userId', authMiddleware, async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await FollowerModel.findOne({ user: userId })
            .populate('following.user');
        return res.status(201).json({
            following: user.following
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//FOLLOW A USER
router.post('/follow/:userToFollowId', authMiddleware, async (req, res, next) => {
    try {
        const { userToFollowId } = req.params;
        const { userId } = req;

        if (userId === userToFollowId) {
            return res.status(201).json({
                msg: 'You cannot follow yourself'
            })
        }

        const user = await FollowerModel.findOne({
            user: userId
        });
        const userToFollow = await FollowerModel.findOne({
            user: userToFollowId
        });

        if (!user || !userToFollow) {
            return res.status(404).json({
                msg: 'User not Found'
            })
        }

        const isFollowing =
            user.following.length > 0 &&
            user.following.filter(following => following.user.toString() === userToFollowId)
                .length > 0;

        if (isFollowing) return res.status(401).json({
            msg: "User Already Followed"
        })

        await user.following.unshift({ user: userToFollowId });
        await user.save();
        await userToFollow.followers.unshift({ user: userId });
        await userToFollow.save();

        await newFollowerNotification(userId, userToFollowId);

        return res.status(201).json({
            msg: "User Followed"
        })

    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.post('/unfollow/:userToUnfollowId', authMiddleware, async (req, res, next) => {
    const { userToUnfollowId } = req.params;
    const { userId } = req;
    try {
        if (userId === userToUnfollowId) {
            return res.status(201).json({
                msg: 'You cannot follow yourself'
            })
        }

        const user = await FollowerModel.findOne({
            user: userId
        })
        const userToUnfollow = await FollowerModel.findOne({
            user: userToUnfollowId
        })

        if (!user || !userToUnfollow) return res.status(401).json({
            msg: 'user not found'
        })

        const isFollowing = user.following.length > 0
            && user.following.filter(following => following.user.toString() === userToUnfollowId).length > 0;

        if (!isFollowing) return res.status(401).json({
            msg: 'User is not followed'
        })

        const followingIndex = user.following.map(following => following.user.toString()).indexOf(userToUnfollowId.toString());
        await user.following.splice(followingIndex, 1);
        await user.save();

        const followerIndex = userToUnfollow.followers.map(follower => follower.user.toString()).indexOf(userId.toString());
        await userToUnfollow.followers.splice(followerIndex, 1);
        await userToUnfollow.save();

        await removeFollowerNotification(userId, userToUnfollowId);

        return res.status(201).json({
            msg: 'User unfollowed'
        })

    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.get('/notify/:username', authMiddleware, async (req, res) => {
    const user = await UserModel.findOne({ username: req.params.username.toString() });
    await new notificationModel({
        user: user._id,
        notifications: []
    }).save();
    return res.status(201).json({
        msg: 'success'
    })
})

module.exports = router;