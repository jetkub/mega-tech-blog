const { Comment } = require('../models');

const commentData = [
	{
		comment_content: 'Nice post! Eager to see more content about accessibility.',
		user_id: 5,
		post_id: 1,
	},
	{
		comment_content: 'Very nice. Let\'s see Paul Allen\'s operating system.',
		user_id: 6,
		post_id: 3,
	},
	{
		comment_content: 'YESSSSS. I\'ve been preaching this for years. Thank you for writing this.',
		user_id: 3,
		post_id: 2,
	},
	{
		comment_content: 'I\'ve been using linux since 2005 and I\'ve never had a problem with it.',
		user_id: 7,
		post_id: 3,
	},
	{
		comment_content: 'I\'ve been using linux since yesterday and I\'ve had nothing but problems with it.',
		user_id: 2,
		post_id: 3,
	},
	{
		comment_content: 'You should check out the vscode.dev PWA. It\'s a great way to code on the go! It supports remote tunnels so you can code on your local machine from anywhere.',
		user_id: 8,
		post_id: 4,
	},
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
