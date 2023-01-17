const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create model associations
User.hasMany(Post, {
	foreignKey: 'user_id',
	// if a user is deleted, also delete any associated Posts
	onDelete: 'CASCADE',
});

Post.belongsTo(User, {
	foreignKey: 'user_id',
});

User.hasMany(Comment, {
	foreignKey: 'user_id',
	// if a user is deleted, also delete any associated Comments
	onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
	foreignKey: 'user_id',
});

Post.hasMany(Comment, {
	foreignKey: 'post_id',
	// if a post is deleted, also delete any associated Comments
	onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
	foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
