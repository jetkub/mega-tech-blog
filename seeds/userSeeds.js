const User = require('../models/User');

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
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;