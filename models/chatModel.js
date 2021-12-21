const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    chats: [
        {
            messagesWith: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            messages: [
                {
                    msg: {
                        type: String,
                        required: true
                    },
                    sender: {
                        type: Schema.Types.ObjectId,
                        ref: 'user',
                        required: true
                    },
                    reciever: {
                        type: Schema.Types.ObjectId,
                        ref: 'user',
                        required: true
                    },
                    date: {
                        type: Date
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model('chat',ChatSchema);