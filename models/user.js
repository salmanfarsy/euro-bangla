const mongoose = require('mongoose');
const monpass = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
	username: String,
	password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchema.plugin(monpass);

module.exports = mongoose.model('User', userSchema);