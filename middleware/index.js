const Series = require('../models/series');
const Comment = require('../models/comment');
const middleware = {
	check : (req, res, next)=>{
		if(req.isAuthenticated()){
			return next();
		} else{
			req.flash('error', 'Please Login or Register');
			res.redirect('/login');
		}
	},
post : (req, res, next)=>{
	Series.findById(req.params.id, (err, post)=>{
		if(err){
			console.log(err);
		} else{
			if(post.author.id.equals(req.user._id) || req.user.isAdmin  ){
				return next();
			} else{
				res.redirect('back');
			}
		}
	})
},
comment : (req, res, next)=>{
	Comment.findById(req.params.id, (err, post)=>{
		if(err){
			console.log(err);
		} else{
			if(post.author.id.equals(req.user._id) || req.user.isAdmin){
				return next();
			} else{
				res.redirect('back');
			}
		}
	})
}
};

module.exports = middleware;