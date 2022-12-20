const Posts = require('../models/post');

const User = require('../models/user');

module.exports.home = async function(req, res){

    try{
        let posts = await Posts.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        let users = await User.find({});
        return res.render('home', {
            title: "Codeial Home",
            posts: posts,
            all_users: users
        })
    }catch(err){
        console.log(`Error: ${err}`);
        return;
    }
    
}