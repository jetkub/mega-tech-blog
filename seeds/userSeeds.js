const User = require('../models/User');

const userData = [
	{
		name: 'Jakub',
		email: 'jakub@email.com',
		password: 'password1',
	},
	{
		name: 'Ricky',
		email: 'ricky@email.com',
		password: 'password2',
	},
	{
		name: 'Ama',
		email: 'ama@email.com',
		password: 'password3',
	},
	{
		name: 'Robert',
		email: 'robert@email.com',
		password: 'password4',
	},
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;