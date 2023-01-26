const { User } = require('../models');

const userData = [
	{
		username: 'jakubpawel',
		password: 'password1',
	},
	{
		username: 'ricktastic12',
		password: 'password2',
	},
	{
		username: 'amaleaveitatthat',
		password: 'password3',
	},
	{
		username: 'robbyrob',
		password: 'password4',
	},
	{
		username: 'jimmyjim',
		password: 'password5',
	},
	{
		username: 'nosaltsoftware',
		password: 'password6',
	},
	{
		username: 'javascript4life',
		password: 'password7',
	},
	{
		username: 'technomancer',
		password: 'password8',
	}
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;