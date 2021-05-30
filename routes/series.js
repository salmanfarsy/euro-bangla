const express = require('express'),
router = express.Router(),
middleware = require('../middleware');
Series = require('../models/series');
//index
router.get('/series', (req, res)=>{
	Series.find({}, (err, shows)=>{
		if(err){
			console.log(err)
		} else{
			res.render('series/index', {shows:shows})
		}
	})
});
//adding
router.get('/series/add',middleware.check, (req, res)=>{
	res.render('series/add');
})
router.post('/series', (req, res)=>{
	const post = req.body.series;
	post.author = {
		id:req.user._id,
		username:req.user.username
	};
	Series.create(post, (err, done)=>{
		if(err){
			console.log(err)
		} else{
			res.redirect('/series');
		}
	})
});
//showing
router.get('/series/:id', middleware.check, (req, res)=>{
	Series.findById(req.params.id).populate('comment').exec((err, show)=>{
		if(err){
			console.log(err)
		} else {
			res.render('series/show', {show : show});
		}
	})
});
//edit
router.get('/series/:id/edit', middleware.post, (req, res)=>{
	Series.findById(req.params.id, (err, show)=>{
		res.render('series/edit', {show : show});
	})
});

router.put('/series/:id',middleware.post, (req, res)=>{
	Series.findByIdAndUpdate(req.params.id, req.body.series, (err, done)=>{
		if(err){
			console.log(err)
		} else{
			res.redirect('/series/' + req.params.id);
		}
	})
});
//delete
router.delete('/series/:id',middleware.post, (req, res)=>{
	Series.findByIdAndDelete(req.params.id, (err, done)=>{
		if(err){
			console.log(err)
		} else{
			res.redirect('/series');
		}
	})
})

//Filter
router.get('/series/filter/:pro', (req, res)=>{
	Series.find({catagory:req.params.pro},(err, shows)=>{
		if(err){
			console.log(err)
		} else{
			res.render('series/filter', {shows : shows})
		}
	})
} );

module.exports = router;