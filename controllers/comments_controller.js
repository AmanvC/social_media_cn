const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post_id);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post_id,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment Created Successfully');
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        console.log(`Error in creating a comment: ${err}`);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId);
            req.flash('success', 'Comment Deleted Successfully');
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        console.log(`Error in destroying a comment: ${err}`);
        return;
    }
}