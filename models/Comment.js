const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// set up model for Comments
class Comment extends Model {}

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		comment_content: {
			// use STRING so that max comment length is 255 characters
			type: DataTypes.STRING,
			allowNull: false,
			// validate that the comment is at least 1 character long
			// and no more than 255 characters
			validate: {
				len: [1, 255],
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		post_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'post',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'comment',
	}
);

module.exports = Comment;