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





module.exports = router;