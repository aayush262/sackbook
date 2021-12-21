const Router = require('express').Router();
const signupRoutes = require('./../api/signup')
const authRoutes = require('./../api/auth');
const searchRoutes = require('./../api/search')
const PostRoutes = require('./../api/post');
const ProfileRoutes = require('./../api/profile');
const NotificationRoutes = require('./../api/notification');

Router.use('/signup', signupRoutes);
Router.use('/auth', authRoutes);
Router.use('/search', searchRoutes);
Router.use('/post', PostRoutes);
Router.use('/profile', ProfileRoutes);
Router.use('/notification', NotificationRoutes);

module.exports = Router;