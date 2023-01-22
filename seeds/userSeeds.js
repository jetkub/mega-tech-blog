const User = require('../models/User');

const userData = [
	{
		name: 'Jakub',
		username: 'jakub@username.com',
		password: 'password1',
	},
	{
		name: 'Ricky',
		username: 'ricky@username.com',
		password: 'password2',
	},
	{
		name: 'Ama',
		username: 'ama@username.com',
		password: 'password3',
	},
	{
		name: 'Robert',
		username: 'robert@username.com',
		password: 'password4',
	},
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;