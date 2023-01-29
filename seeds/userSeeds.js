const { User } = require('../models');

const userData = [
	{
		id: 1,
		username: 'amaleaveitatthat',
		password: 'password1',
	},
	{
		id: 2,
		username: 'ricktastic12',
		password: 'password2',
	},
	{
		id: 3,

		username: 'jakubpawel',
		password: 'password3',

	},
	{
		id: 4,
		username: 'robbyrob',
		password: 'password4',
	},
	{
		id: 5,
		username: 'jimmyjim',
		password: 'password5',
	},
	{
		id: 6,
		username: 'nosaltsoftware',
		password: 'password6',
	},
	{
		id: 7,
		username: 'javascript4life',
		password: 'password7',
	},
	{
		id: 8,
		username: 'technomancer',
		password: 'password8',
	}
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;