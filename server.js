const express = require('express');
const bodyParser = require('body-parser');
const configs = require('./configs/app');
const sequelize = require('./configs/sequelize');
const passport = require('./configs/passport');

// include dotenv config
require('./configs/dotenv');

// initialize app
const app = express();

// add body parser to app
app.use(bodyParser);

// attach passport to application
app.use(passport.initialize());
// define routes
app.use('/auth', require('./routes/auth')(passport));
app.use('/accounts', require('./routes/accounts')(passport));
app.use('/definitions', require('./routes/definitions')(passport));
app.use('/terms', require('./routes/terms')(passport));

// authenticate sequelize
sequelize.authenticate().then(() => {
    console.log('Successfully connected to database.');
}).catch(e => {
    throw new Error('Failed to connect to database: '+e.message);
});

// start app
app.listen(configs.port, () => {
    console.log(`Server started on port ${configs.port}`);
});