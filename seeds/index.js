const sequelize = require('../config/connection');
const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');


const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await seedUsers();
	console.log('\n----- USERS SEEDED -----\n');

	await seedPosts();
	console.log('\n----- POSTS SEEDED -----\n');

	await seedComments();
	console.log('\n----- COMMENTS SEEDED -----\n');

	process.exit(0);
};

seedDatabase();
