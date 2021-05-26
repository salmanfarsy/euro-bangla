const express = require('express');
const router = express.Router();
const Series = require('../models/series');
const Comment = require('../models/comment');
const middleware = require('../middleware');

router.post('/series/:id/comment', middleware.check, (req, res)=>{
Series.findById(req.params.id, (err, show)=>{
	if(err){
		console.log('this is the error ' , err)
	} else{
		Comment.create(req.body.comment, (err, comment)=>{
			if(err){
				console.log('another error', err)
			} else{
		comment.author.id = req.user._id;
		comment.author.username=req.user.username;
					comment.save();
			show.comment.push(comment);
			show.save();
			res.redirect('/series/' + req.params.id);
			}
		
		})
	}
})
});
router.get('/series/:id/comment/:com/edit',middleware.comment, (req, res)=>{
	Comment.findById(req.params.com, (err, comment)=>{
		if(err){
			console.log(err)
		} else{
			res.render('comment/edit', {comment : comment, id : req.params.id})
		}
	})
});
router.put('/series/:id/comment/:com', middleware.comment, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.com, req.body.comment, (err, done)=>{
		if(err){
			console.log(err)
		} else{
			res.redirect('/series/' + req.params.id);
		}
	})
});
router.delete('/series/:id/comment/:com', middleware.comment, (req, res)=>{
	Comment.findByIdAndDelete(req.params.com, (err, done)=>{
		if(err){
			console.log(err)
		} else{
			res.redirect('/series/' + req.params.id);
		}
	})
})

module.exports = router;