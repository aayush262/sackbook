const UserModel = require('./../models/userModel');
const NotificationModel = require('./../models/notificationModel');
const router = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const notification = await NotificationModel.findOne({
            user: req.userId
        }).populate('notifications.user')
            .populate('notifications.post')

        return res.status(201).json({
            msg: "Notifications fetched",
            notification
        })
    } catch (err) {
        return res.status(500).json({
            msg: "Server Error"
        })
    }
})

router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(user.unreadNotifications){
            user.unreadNotifications = false;
            await user.save()
        }

        return res.status(201).json({
            msg: "Updated"
        })
    } catch (err) {
        return res.status(500).json({
            msg: "Server Error"
        })
    }
})




module.exports = router;