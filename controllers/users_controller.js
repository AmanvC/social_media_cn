const User = require('../models/user');

module.exports.users = function(req, res){
    return res.render('./user_profile', {
        title: "User Profile"
    });
}

//render signup page
module.exports.signUp = function(req, res){
    return res.render('./user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render signin page
module.exports.signIn = function(req, res){
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
    //todo
}