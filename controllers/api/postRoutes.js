const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/posts
router.get('/', (req, res) => {
	// Access our Post model and run .findAll() method
	Post.findAll({
		// Query configuration
		attributes: [
			'id',
			'post_content',
			'title',
			'created_at',
			// use raw MySQL aggregate function query to get a count of how many comments are on each post and return it under the name `comment_count`
			[sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count'],
		],
		order: [['created_at', 'DESC']],
		include: [
			{
				model: User,
				attributes: ['username'],
			}
		],
	})
		.then((postData) => res.json(postData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /api/posts/:id
router.get('/:id', (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			'id',
			'post_content',
			'title',
			'created_at',
			[sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count'],
		],
		include: [
			{
				model: User,
				attributes: ['username'],
			},
			{
				model: Comment,
				attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
				include: {
					model: User,
					attributes: ['username'],
				},
			},
		],
	})
		.then((postData) => {
			if (!postData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(postData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/posts
router.post('/', (req, res) => {
	// expects {title: 'Post Title', post_content: 'Example Text, user_id: 1}
	Post.create({
		title: req.body.title,
		post_content: req.body.post_content,
		user_id: req.body.user_id,
	})
		.then((postData) => res.json(postData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// PUT /api/posts/:id
router.put('/:id', (req, res) => {
	// expects {title: 'New Title', post_content: 'New Text, user_id: 1}
	// add an updated_at column to the Post model
	Post.update(
		{
			title: req.body.title,
			post_content: req.body.post_content,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((postData) => {
			if (!postData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(postData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});


// DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((postData) => {
			if (!postData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(postData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
