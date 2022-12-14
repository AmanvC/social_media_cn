module.exports.home = function(req, res){
    return res.render('home', {
        title: "Home"
    })
}

module.exports.login = function(req, res){
    return res.end('<h1>Welcome to Login</h1>')
}