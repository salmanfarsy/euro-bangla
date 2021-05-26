const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema({
	title:String,
	image:String,
	price:Number,
	catagory:String,
	review:String,
	year:Number,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectID,
			ref:'User'
		},
		username: String
	},
	comment : [{
			type:mongoose.Schema.Types.ObjectID,
			ref:'Comment'
		
	}
		
	]
});

module.exports = mongoose.model('Series', seriesSchema);