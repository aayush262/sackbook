const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    type: {
        type: String,
        enum: ['newLike','newComment','newFollower']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref:'post'
    },
    comment: String,
    date:  {
        type: Date,
        default: Date.now
    }
})

moudel.exports = mongoose.model('notification', NotificationSchema);