const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Initializations
const app = express();
require('./database');

// Settings 
app.set('port', process.env.PORT || 9000);

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.use(require('./routes/users'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});