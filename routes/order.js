const e = require('express');
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Series = require('../models/series');
router.get('/series/:id/order', (req, res)=>{
Series.findById(req.params.id, (err, show)=>{
	if(err){
		console.log(err)
	} else{
	res.render('order/form', {show:show});	
	}
})
	
});

router.post('/series/:id/order', (req, res)=>{
	const input = req.body.order;
	input.product = req.params.id;
	input.user = req.user.username;
	Order.create(input, (err, done)=>{
		if(err){
			console.log(err)
		} else{
			res.render('order/conform');
		}
	});
		
	});

	router.get('/orders', (req, res)=>{
		Order.find({}).populate('product').exec((err, orders)=>{
			if(err){
				console.log(err)
			} else{
				res.render('order/orders', {orders:orders});
			}
		})
		
	});

	router.delete('/order/:id', (req, res)=>{
		Order.findByIdAndDelete(req.params.id, (err, done)=>{
			if(err){
				console.log(err)
			} else {
				res.redirect('back')
			}
		})
	})





module.exports = router;