const express = require('express');
const app = express();
const port = 8004;
const cookieParser = require('cookie-parser');

//require express ejs layouts
const expressLayouts = require('express-ejs-layouts');

//require mongoose db
const db = require('./config/mongoose');

//for session cookie
const session = require('express-session');

//passport
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//Mongo Store, it requires an argument(because it needs to store session information to db)
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended', //compressed
    prefix: '/css',
}))

//middleware(parser) to get form data
app.use(express.urlencoded({extended: true}));

//use cookie parser
app.use(cookieParser());

//use created db schema
const User = require('./models/user');

//set static files path
app.use(express.static('./assets'));

//use express layouts
app.use(expressLayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store session cookie in the db
app.use(session({
    name: 'codeial', //name of cookie
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething', //to encode and decode
    saveUninitialized: false,
    resave: false,
    cookie: { //age of cookie(validity of cookie)
        maxAge: (1000 * 60 * 100) //in milliseconds
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb-setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); //for every request coming in, firstly this middleware will be called

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        // console.log("Error in running the server: ", err);
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})