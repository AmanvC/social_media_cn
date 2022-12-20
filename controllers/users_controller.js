const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('./user_profile', {
            title: "User Profile",
            profile_user: user
        });
    })
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email}, function(err, user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}

//render signup page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('./user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render signin page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('./user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//get the signup data
module.exports.createUser = function(req, res){
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log(`Error in finding user in signing up: ${err}`);
            return;
        }
        if(user){
            return res.redirect('back');
        }else{
            User.create(req.body, function(err, user){
                if(err){
                    console.log(`Error in creating user while signing up: ${err}`)
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
    })
}

//Sign In and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/'); //assuming user has already signed in, the user will go here
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        // console.log(`Error in signing out: ${err}`);
    }); //function given to request by passport.js
    return res.redirect('/');
}

