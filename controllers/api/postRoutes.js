const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/posts
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			attributes: [
				'id',
				'post_content',
				'title',
				'created_at',
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
		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			attributes: [
				'id',
				'post_content',
				'title',
				'created_at',
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
					attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
				},
			],
		});

		if (!postData) {
			res.status(404).json({ message: 'No post found with this id!' });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST /api/posts
router.post('/', withAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(404).json({ message: 'No session found!' });
			return;
		}
		const postData = await Post.create({
			title: req.body.title,
			post_content: req.body.post_content,
			user_id: req.session.user_id,
		});

		res.status(200).json(postData);
	} catch (err) {
		res.status(400).json(err);
	}
});

// PUT /api/posts/:id
router.put('/:id', withAuth, async (req, res) => {
	// expects {title: 'New Title', post_content: 'New Text, user_id: 1}
	try {
		if (!req.session) {
			res.status(404).json({ message: 'No session found!' });
			return;
		}
		postData = await Post.update(
			{
				title: req.body.title,
				post_content: req.body.post_content
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);

		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' });
			return;
		}
		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE /api/posts/:id
router.delete('/:id', withAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(404).json({ message: 'No session found!' });
			return;
		}
		const postData = await Post.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!postData) {
			res.status(404).json({ message: 'No post found with this id!' });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
