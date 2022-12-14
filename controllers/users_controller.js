module.exports.profile = function(req, res){
    return res.end('<h1>User profile</h1>')
}

module.exports.category = function(req, res){
    return res.end('<h1>Category of user account</h1>')
}

module.exports.users = function(req, res){
    return res.render('./user_profile', {
        title: "User Profile"
    });
}
