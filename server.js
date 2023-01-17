const path = require('path');
const express = require('express');
const session = require('express-session');
const expHandlebars = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = expHandlebars.create({});

const sess = {
	secret: 'sensitize-hurry7-pointing-moonshine',
	cookie: {
		maxAge: 60 * 60 * 1000,
		secure: false, // set to true if your using https/for production
		httpOnly: true,
		sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(` 🚀 Now listening at http://localhost:${PORT}`));
});
