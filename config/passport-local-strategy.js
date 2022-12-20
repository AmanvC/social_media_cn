const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/user");

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',  //unique field
        passReqToCallback: true
    },
    function(req, email, password, done){  //uses these 3 arguments, //whenever passport is being called, email and password are automatically passed to it
        //find a user and establish the identity
        User.findOne({email: email}, function(err, user){ 
            if(err){
                req.flash('error', err);
                return done(err); //report error to passport
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid username/password');
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

//Serializing(ex-telling to put user_id into cookie, and not other fields)
//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deserializing(when cookie sent back to server, and we are establishing the identity of which user is making request, we are using that id to find the user, this is deserializing)
//Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log(`Error in finding user --> Passport`);
            return done(err);
        }
        return done(null, user);
    })
})

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next(); //if user is signed in, pass him the page
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user = req.user
        //whenever user sign in, users info will be available in req.user
    }
    next();
}

module.exports = passport;