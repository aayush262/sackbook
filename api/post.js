const router = require('express').Router();
const PostModel = require('./../models/postModel');
const UserModel = require('./../models/userModel')
const authMiddleware = require('./../middlewares/authMiddleware');
const uuid = require('uuid').v4;

router.get('/', authMiddleware, async (req, res, next) => {
    const { pageNumber } = req.query;
    const number = Number(pageNumber);
    const size = 8;

    try {
        if (number === 1) {
            const posts = await PostModel.find()
                .limit(size)
                .sort({
                    createdAt: -1
                })
                .populate('user')
                .populate('comments.user')
                .populate('likes.user')
            if (posts.length === 0) return res.status(201).json({
                msg: "Posts not found",
                posts
            })
            return res.status(201).json({
                msg: "List of all posts",
                posts
            })
        } else {
            const skips = size * (number - 1);
            const posts = await PostModel.find()
                .skip(skips)
                .limit(size)
                .sort({
                    createdAt: -1
                })
                .populate('user')
                .populate('comments.user')
                .populate('likes.user')
            if (posts.length === 0) return res.status(201).json({
                msg: "Posts not found",
                posts
            })
            return res.status(201).json({
                msg: "List of all posts",
                posts
            })
        }

    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.post('/', authMiddleware, async (req, res, next) => {
    const { text, picUrl, location } = req.body;
    if (text.length < 1) return res.status(401).json({
        msg: 'text is required'
    })
    const newPost = new PostModel({
        user: req.userId,
        text
    })
    if (picUrl) newPost.picUrl = picUrl;
    if (location) newPost.location = location;
    try {
        const savedPost = await newPost.save()
        await savedPost.populate('user')
        return res.status(201).json({
            msg: 'Post Successfully generated',
            post: savedPost
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.get('/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await PostModel.findById(postId).populate('user')
            .populate('likes.user')
            .populate('comments.user')
        if (!post) return res.status(401).json({
            msg: "Post not found",
        })
        return res.status(201).json({
            msg: "Post found",
            post
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.delete('/:postId', authMiddleware, async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    try {
        const post = await PostModel.findById(postId).populate('user');
        if (!post) return res.status(401).json({
            msg: "Post not found",
        })
        const user = await UserModel.findById(userId);
        if (!user) return res.status(401).json({
            msg: 'User not found'
        })
        if (post.user.toString() !== userId) {
            if (user.role === 'root') {
                await post.remove()
                return res.status(201).json({
                    msg: "Post Deleted",
                    post
                })
            } else {
                return res.status(401).json({
                    msg: "Unauthorized User",
                })
            }
        }
        await post.remove()
        return res.status(201).json({
            msg: "Post Deleted",
            post
        })

    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.post('/like/:postId', authMiddleware, async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    try {
        const post = await PostModel.findById(postId)
        const isLiked = post.likes.filter(like => like.user.toString() === userId).length > 0
        if (isLiked) return res.status(401).json({
            msg: 'Already Liked'
        })
        await post.likes.unshift({
            user: userId
        })
        await post.save()
        return res.status(201).json({
            msg: 'Post Liked'
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.post('/unlike/:postId', authMiddleware, async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    try {
        const post = await PostModel.findById(postId)
        const isUnLiked = post.likes.filter(like => like.user.toString() === userId).length === 0
        if (isUnLiked) return res.status(401).json({
            msg: 'Post is not liked before'
        })
        const index = post.likes.map(like => like.user.toString()).indexOf(userId);
        await post.likes.splice(index, 1);
        await post.save();
        return res.status(201).json({
            msg: 'Post Unliked'
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

router.get('/like/:postId', authMiddleware, async (req, res, next) => {
    const postId = req.params.postId
    try {
        const post = await PostModel.findById(postId).populate('likes.user')
        if (!post) return res.status(401).json({
            msg: 'Post not found'
        })
        return res.status(201).json({
            msg: 'Post found',
            likes: post.likes
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//CREATING A COMMENT

router.post('/comment/:postId', authMiddleware, async (req, res, next) => {
    const postId = req.params.postId;
    const text = req.body.text;
    if (text.length < 1) return res.status(401).json({
        msg: 'Text required'
    })
    try {
        const post = await PostModel.findById(postId);
        if (!post) return res.status(401).json({
            msg: 'Post not found'
        })
        const newComment = {
            _id: uuid(),
            text,
            user: req.userId,
            date: Date.now()
        }
        await post.comments.unshift(newComment);
        await post.save();
        return res.status(201).json({
            msg: 'Comment Created',
            id: newComment._id
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//DELETING A COMMENT

router.delete('/comment/:postId/:commentId', authMiddleware, async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = req;
    try {
        const post = await PostModel.findById(postId).populate('comments.user');
        if (!post) return res.status(401).json({
            msg: 'Post not found'
        })
        const comment = post.comments.find(comment => comment._id === commentId);
        if (!comment) return res.status(401).json({
            msg: 'Comment not found'
        })
        const deleteComment = async () => {
            const index = post.comments.map(comment => comment._id.toString()).indexOf(commentId);
            await post.comments.splice(index, 1);
            await post.save();
            return res.status(201).json({
                msg: "Comment Deleted Successfully"
            })
        }
        const user = await UserModel.findById(userId);
        if (!user) return res.status(401).json({
            msg: 'User not found'
        })
        if (comment.user._id.toString() !== userId) {
            if (user.role == 'root') {
                await deleteComment();
            }
            return res.status(401).json({
                msg: 'Unauthorized user'
            })
        }
        await deleteComment();
    } catch (err) {
        return res.status(500).json({
            msg: "Server Error"
        })
    }
})

//FETCH COMMENTS FROM A POST

router.get('/comment/:postId', authMiddleware, async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await PostModel.findById(postId).sort({
            createdAt: -1
        }).populate('comments.user');
        if (!post) return res.status(401).json({
            msg: 'Post not found'
        })
        return res.status(201).json({
            msg: 'comments fetched',
            comments: post.comments
        })
    } catch (err) {
        return res.status(500).json({
            msg: "Server Error"
        })
    }
})

module.exports = router;