const express = require('express');
const router  = express.Router();
const User   = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res)=>{
	res.render('auth/register');
});

router.post('/register', (req, res)=>{
	const newUser = new User({ username : req.body.username});
	if(req.body.admin === '01712545223'){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, (err, done)=>{
		if(err){
			console.log(err);
			req.flash('error', 'User already Exist Or Something is wrong');
			res.redirect('back');
		} else{
			passport.authenticate('local')(req, res, ()=>{
				req.flash('done', 'Welcome New User');
				res.redirect('/series');
			})
		}
	})
});
router.get('/login', (req, res)=>{
	res.render('auth/login');
})
router.post('/login', passport.authenticate('local', {
successRedirect : '/series',
successFlash    :'Welcome new User',
failureRedirect : 'back',
failureFlash     :'User Not Found'
}), (req, res)=>{

})

router.get('/logout', (req, res)=>{
	req.logout();
	req.flash('done', 'You are successfully Logged Out');
	res.redirect('back');
})

module.exports = router;
//mongodb+srv:salman:yyM5vn0uXut6ModU@cluster0.bzg4h.mongodb.net/games?retryWrites=true&w=majority