var mongoose = require('mongoose');  
var Schema=mongoose.Schema;
var userSchema = new Schema({
	_id :Number,
	email : String,
	login : String,
	password : String,
	phone : String,
	firstname : String,
	lastname : String,
	created_on :{ type: Date, default: Date.now},
	Roles :[{type:String, enum: ['Visitor', 'Provider'], default: 'Visitor'  }]
});

var User=mongoose.model('user', userSchema);
module.exports=User;

