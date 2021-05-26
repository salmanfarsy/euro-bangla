const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	customer:String,
	address:String,
	quantity:Number,
	payment:String
});

module.exports = mongoose.model('Order', orderSchema);