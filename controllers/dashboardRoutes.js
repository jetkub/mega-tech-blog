const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// the dashboard will be the homepage for logged in users and contain the user's posts
router.get('/', withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
			include: [
				{
					model: User,
					attributes: ['username'],
				},
				{
					model: Comment,
					attributes: [
						[
							sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'),
							'comment_count',
						],
					],
				}
			],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('dashboard', {
			posts,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// the edit post page will be the same as the create post page, but with the post's data pre-populated
router.get('/edit/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
				{
					model: Comment,
					attributes: [
						[
							sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'),
							'comment_count',
						],
					],
				}
			],
		});

		const post = postData.get({ plain: true });

		res.render('edit-post', {
			...post,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;