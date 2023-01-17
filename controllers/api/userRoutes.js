const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
	// Access our User model and run .findAll() method
	User.findAll({
		// exclude password from the query
		attributes: { exclude: ['password'] },
	})
		.then((userData) => res.json(userData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
	User.findOne({
		attributes: { exclude: ['password'] },
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Post,
				attributes: ['id', 'title', 'post_content', 'created_at'],
			},
			// include the Comment model here:
			{
				model: Comment,
				attributes: ['id', 'comment_content', 'created_at'],
				include: {
					model: Post,
					attributes: ['title'],
				},
			},
		],
	})
		.then((userData) => {
			if (!userData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/users
router.post('/', (req, res) => {
	// expects {username: 'user', password: 'password1234'}
	User.create({
		username: req.body.username,
		password: req.body.password,
	})
		.then((userData) => {
			req.session.save(() => {
				req.session.user_id = userData.id;
				req.session.username = userData.username;
				req.session.loggedIn = true;

				res.json(userData);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/users/login
router.post('/login', (req, res) => {
	// expects {username: 'user', password: 'password1234'}
	User.findOne({
		where: {
			username: req.body.username,
		},
	}).then((userData) => {
		if (!userData) {
			res.status(400).json({ message: 'No user with that username!' });
			return;
		}

		const validPassword = userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect password!' });
			return;
		}

		req.session.save(() => {
			// declare session variables
			req.session.user_id = userData.id;
			req.session.username = userData.username;
			req.session.loggedIn = true;

			res.json({ user: userData, message: 'You are now logged in!' });
		});
	});
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
	// expects {username: 'user', password: 'password1234'}
	User.update(req.body, {
		individualHooks: true,
		where: {
			id: req.params.id,
		},
	})
		.then((userData) => {
			if (!userData[0]) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((userData) => {
			if (!userData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;

