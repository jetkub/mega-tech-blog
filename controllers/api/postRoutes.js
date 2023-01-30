const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
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
					attributes: ['username', 'id'],
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
				'updated_at',
				[
					sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'),
					'comment_count',
				],
			],
			include: [
				{
					model: User,
					attributes: ['username', 'id'],
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
	// expects {title: 'title', post_content: 'big blob of text', user_id: 'number'}
	try {
		if (!req.session) {
			res.status(404).json({ message: 'No session found!' });
			return;
		}
		console.log(req.body);
		const postData = await Post.create({
			...req.body,
			// add OR statement so that if the user is logged in, the user_id is the session user_id, otherwise it is the user_id from the request body
			user_id: req.session.user_id || req.body.user_id,
		});
		console.log(postData);
		res.status(200).json(postData);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// PUT /api/posts/:id
router.put('/:id', withAuth, async (req, res) => {
	// expects {title: 'New Title', post_content: 'New Text'}
	try {
		if (!req.session) {
			res.status(404).json({ message: 'No session found!' });
			return;
		}
		const postData = await Post.update(
			{
				...req.body,
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
		console.log(postData);
		res.status(200).json(postData);
	} catch (err) {
		console.log(err);
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
		console.log(req.body);
		console.log(postData);

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
