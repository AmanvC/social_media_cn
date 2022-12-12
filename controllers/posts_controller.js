module.exports.create = function(req, res){
    return res.end('<h1>Create a post</h1>');
}

module.exports.edit = function(req, res){
    return res.end('<h1>Edit the post</h1>');
}