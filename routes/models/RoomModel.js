var mongoose = require('mongoose');  
var Schema=mongoose.Schema;
var roomSchema = new Schema({
	 name: {
		    type: String,
		    "default": ' ',
		    trim: true,
		    required: 'Name cannot be blank'
		  },
	topic: {
		    type: String,   default: '',   trim: true
		  },
	creator: { type: Number, ref: 'users' },
	status:{type: String,   enum: ['open', 'closed'],    default: 'open'  },
	users:[{type: Number, ref: 'user' }],
	created_on:{type:Date,default:Date.now },
	questionare:{type:Array, default:[]},
	updated_date:{type:Date},
	severity:Number
});
module.exports=mongoose.model('room', roomSchema);