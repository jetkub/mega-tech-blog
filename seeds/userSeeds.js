const User = require('../models/User');

const userData = [
	{
		name: 'Jakub Cichon',
		username: 'jakubpawel',
		password: 'password1',
	},
	{
		name: 'Ricky Aponte',
		username: 'ricktastic12',
		password: 'password2',
	},
	{
		name: 'Ama Frema',
		username: 'amaleaveitatthat',
		password: 'password3',
	},
	{
		name: 'Robert Obernier',
		username: 'robbyrob',
		password: 'password4',
	},
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;