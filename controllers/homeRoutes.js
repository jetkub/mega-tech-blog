const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			attributes: [
				'id',
				'post_content',
				'title',
				'created_at',
				'updated_at',
				// use raw MySQL aggregate function query to get a count of how many comments are on each post and return it under the name `comment_count`
				[
					sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'),
					'comment_count',
				],
			],
			order: [['created_at', 'DESC']],
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('homepage', {
			posts,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET one post
router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			attributes: [
				'id',
				'post_content',
				'title',
				'created_at',
				'updated_at',
				// use raw MySQL aggregate function query to get a count of how many comments are on each post and return it under the name `comment_count`
				[
					sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'),
					'comment_count',
				],
			],
			include: [
				{
					model: User,
					attributes: ['username'],
				},
				{
					model: Comment,
					attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at', 'updated_at'],
					include: {
						model: User,
						attributes: ['username'],
					},
				},
			],
		});

		const post = postData.get({ plain: true });

		res.render('single-post', {
			...post,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		// find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password'],
				include: [
					// sql query that will retrun total number of posts and comments for each user
					[sequelize.literal('(SELECT COUNT(*) FROM post WHERE user.id = post.user_id)'), 'post_count'],
					[
						sequelize.literal('(SELECT COUNT(*) FROM comment WHERE user.id = comment.user_id)'),
						'comment_count',
					],
				],
			},
			include: [
				{
					model: Post,
					attributes: [
						'id',
						'title',
						'post_content',
						'created_at',
						'updated_at',
						// [
						// 	sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'),
						// 	'comment_count',
						// ],
					],
				},
				{
					model: Comment,
				},
			],
		});

		const user = userData.get({ plain: true });

		res.render('dashboard', {
			...user,
			logged_in: true,
			username: req.session.username,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET login
router.get('/login', (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

// GET signup
router.get('/signup', (req, res) => {
	res.render('signup');
});

module.exports = router;
