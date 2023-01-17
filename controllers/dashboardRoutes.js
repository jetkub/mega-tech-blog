const router = require('express').Router();
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
					attributes: ['name'],
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
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;