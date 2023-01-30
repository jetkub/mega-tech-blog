const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model

class User extends Model {
	// set up method to check password
	checkPassword(loginPassword) {
		return bcrypt.compareSync(loginPassword, this.password);
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				// password must be at least 8 characters long
				len: [8],
			},
		},
	},
	{
		hooks: {
			// hash password before creating new user
			async beforeCreate(newUserData) {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			// hash password before updating password in database
			async beforeUpdate(updatedUserData) {
				updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
				return updatedUserData;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'user',
	}
);

module.exports = User;
