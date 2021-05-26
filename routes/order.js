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
		
	})





module.exports = router;