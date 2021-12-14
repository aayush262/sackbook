const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    notifications: [
        {
            type: {
                type: String,
                enum: ['newLike', 'newComment', 'newFollower']
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post'
            },
            text: String,
            commentId: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = mongoose.model('notification', NotificationSchema);