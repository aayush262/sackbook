const UserModel = require('./../models/userModel');
const NotificationModel = require('./../models/notificationModel');

const setNotificationToUnread = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user.unreadNotifications) {
            user.unreadNotifications = true;
            await user.save();
        }
        return;
    } catch (err) {
        console.log(err)
    }
}

const newLikeNotification = async (userId, postId, userToNotifyId) => {
    try {
        const userToNotify = await NotificationModel.findOne({
            user: userToNotifyId
        })
        const notification = {
            type: 'newLike',
            user: userId,
            post: postId,
            date: Date.now()
        }
        await userToNotify.notifications.unshift(notification);
        await userToNotify.save();
        await setNotificationToUnread(userToNotifyId);
        return;
    } catch (err) {
        console.log(err)
    }
}

const removeLikeNotification = async (userId, postId, userNotifyId) => {
    try {
        await NotificationModel.findOneAndUpdate({ user: userNotifyId }, {
            $pull: {
                type: 'newLike',
                user: userId,
                post: postId
            }
        })
        return;
    } catch (err) {
        console.log(err)
    }
}

const newCommentNotification = async (userId, postId, commentId, text, userToNotifyId) => {
    try {
        const userToNotify = await NotificationModel.findOne({
            user: userToNotifyId
        })
        const notification = {
            type: 'newComment',
            user: userId,
            post: postId,
            text,
            commentId,
            date: Date.now()
        }
        await userToNotify.notifications.unshift(notification);
        await userToNotify.save();
        await setNotificationToUnread(userToNotifyId);
        return;
    } catch (err) {
        console.log(err)
    }
}
const removeCommentNotification = async (userId, postId, commentId, userToNotifyId) => {
    try {
        await NotificationModel.findOneAndUpdate({
            user: userToNotifyId
        }, {
            $pull: {
                notifications: {
                    type: 'newComment',
                    commentId: commentId,
                    user: userId,
                    post: postId
                }
            }
        })
        return
    } catch (err) {
        console.log(err)
    }
}

const newFollowerNotification = async (userId, userToNotifyId) => {
    try {
        const userToNotify = await NotificationModel.findOne({
            user: userToNotifyId
        })
        const notification = {
            type: 'newFollower',
            date: Date.now(),
            user: userId
        }
        await userToNotify.notifications.unshift(notification);
        await userToNotify.save();
        await setNotificationToUnread(userToNotifyId);
        return;
    } catch (err) {
        console.log(err)
    }
}

const removeFollowerNotification = async (userId, userToNotifyId) => {
    try {
        await NotificationModel.findOneAndUpdate({
            user: userToNotifyId
        }, {
            $pull: {
                notifications: {
                    type: 'newFollower',
                    user: userId
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    newLikeNotification,
    removeLikeNotification,
    newCommentNotification,
    removeCommentNotification,
    newFollowerNotification,
    removeFollowerNotification
}