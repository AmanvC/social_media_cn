const Posts = require('../models/post');

module.exports.home = function(req, res){
    // Posts.find({}, function(err,posts){
    //     return res.render('home', {
    //         title: "Codeial Home",
    //         posts: posts
    //     })
    // });

    Posts.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(req, posts){
        return res.render('home', {
            title: "Codeial Home",
            posts: posts
        })
    }); 
    
}