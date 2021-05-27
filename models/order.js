const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	customer:String,
	address:String,
	phone:Number,
	quantity:Number,
	payment:String,
	product:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Series'
	},
	isDone:{type:Boolean, default:false},
	user:String
});

module.exports = mongoose.model('Order', orderSchema);