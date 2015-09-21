/*
 * GET users listing.
 */
var User = require("./models/UserModel.js");
var QB1 = require("./models/QBModel.js")
var Room=require('./models/RoomModel.js');
var mongoose = require("mongoose");
var ObjectID = require('mongodb').ObjectID;
var config=require('./config.server.js');

mongoose.connect('mongodb://'+config.db);
var conn = mongoose.connection;


exports.list = function(req, res) {
	res.send("respond with a resource");
};


exports.addUser = function(req, res) {
	// console.log(conn)
	var password = "MyWorkDoc";
	var roles = [ "Visitor" ];
	if (req.body.password != null) {
		password = req.body.password;
		roles = [ "Provider" ];
	}
	console.log(req.body);
	var params = {
		login : req.body.firstname+'_'+req.body.lastname,
		password : password,
		email : req.body.email,
		full_name:req.body.firstname+" "+req.body.lastname,
		phone:req.body.phone		
	}
	console.log("Params:" + params);
	QB1.users.create(params, function(error, result) {
		if (error) {
			console.log(error);
			res.send({
				response : 'failed to Create USer....'
			});
		} else if (result) {
			console.log(result);
			var user = new User({
				_id : result.id,
				email : result.email,
				login : result.login,
				password : password,
				phone : result.phone,
				firstname : req.body.firstname,
				lastname : req.body.lastname,
				created_on : Date.now(),
				Roles : roles
			});
			user.save(function(err,user){
				 if(err){
					 res.send({response:"User Registration Failed"});
				 	console.log("Failed to insert...."+err);
				 	removefromQB(QB1,result,res);
				 }else{
					 console.log(user);
					 res.send({response:{user:user}});
				} });			
		} else {
			res.send({
				response : 'failed to Create'
			});
		}
	});
	/*
	 * var user=new User({ name: req.body.name, badge: req.body.badge, dob:
	 * Date.now(), isloved: req.body.isloved }); user.save(function(err,user){
	 * if(err){ res.send("User Registration Failed"); console.log("Failed to
	 * insert...."+err); }else{ console.log(user); res.send(user); } });
	 */// mongoose.userSchema.save(user);
	// res.send(req.body);
};

exports.getUser = function(req, res) {
	/*
	 * mongoose.connect('mongodb://localhost/NodeApp'); var conn =
	 * mongoose.connection;
	 */
	User.find({
		name : /^srini/
	}, function(err, user) {
		if (err) {
			console.log('Error in getUser' + err)
			res.send(err)
		} else {
			res.send(user);
			/*
			 * for(var i=0;i<user.length;i++){ var u=user[i]; u.remove(u._id); }
			 */
		}
	});
};


exports.uploadImage=function(req,res){
	res.send({response:"Image Uploaded"});
};


var sess;
exports.login=function(req,res){
	if(req.body.id!=null && req.body.id != 0){
		User.find({_id:req.body.id},function(err,user){
			if(err){
				res.send({response:"Please Check the PatientID"});
			}else if(user && user[0]){
				console.log(user[0]); 
				var roles=user[0].Roles;
				if((roles).indexOf("Visitor")!=-1){
				var params={login:user[0].login,password:user[0].password};
				QB1.createSession(params,function(err,result){
					if(result){
					console.log(result);
					sess=req.session;
					var data={
						userid:user[0]._id,
						token:result.token,
						role:user[0].Roles[0],
						ts:Date.now()
					}
					sess.user=data;
					var room=new Room({
						name:req.body.reason,
					topic: req.body.reason,
					creator: user[0]._id,
					status:'open',
					users:[user[0]._id],
					created_on:Date.now()
					});
					 var roomid;
					 room.save(function(err,room){
							if(err){
								console.log(err);
								//user.remove({_id:user[0]._id});
								res.send({response:'Room Creation Failed/login Failed'});
							}else if(room){
								console.log(room);
								var base64data=new Buffer(JSON.stringify(data)).toString('base64');
								res.send({response:{token:base64data,room:room,login:user[0].login,password:user[0].password, success:true}});
							}else{
								console.log("Room Creation Failed..");
								res.send({response:'Room Creation Failed/login Failed'});
							}
						});
					}else if(err){
						console.log(err)
						res.send({response:{token:"", success:false}});
					}else{
						res.send({response:{token:"", success:false}});
					}
				});
				}
			}else{
				res.send({response:"Not A Valid Patient ID"});
			}
		});
	}else if(req.body.username!=null && req.body.password!=null){
		User.find({"$and":[{login:req.body.username},{password:req.body.password}]},function(err,user){
			if(err){
				res.send({response:"Please Check the username/password"});
			}else if(user && user[0]){
				console.log(user[0]); 
				var roles=user[0].Roles;
				if((roles).indexOf("Provider")!=-1){
				var params={login:user[0].login,password:user[0].password};
				QB1.createSession(params,function(err,result){
					if(result){ 
					console.log(result);
					sess=req.session;
					var data={
						userid:user[0]._id,
						token:result.token,
						role:user[0].Roles[0],
						ts:Date.now()
					}
					sess.user=data;
					var base64data=new Buffer(JSON.stringify(data)).toString('base64');
					res.send({response:{token:base64data, login:user[0].login,password:user[0].password,userid:user[0]._id,name:user[0].firstname+''+user[0].lastname, success:true}});
					}else if(err){
						console.log(err);
						res.send({response:{token:"", success:false}});
					}else{
						res.send({response:{token:"", success:false}});
					}
				});
				}
			}else{
				res.send({response:"Not A Valid User"});
			}
		});
	}
};


function createRoom(req, user){
	var room=new Room({
		name:req.body.reason,
	topic: req.body.reason,
	creator: user._id,
	status:'open',
	users:[user._id],
	created_on:Date.now()
	});
	room.save(function(err,room){
		console.log();
		if(err){
			console.log(err);
			return null;
		}else if(room){
			console.log(room);
			return room;
		}else{
			console.log("Room Creation Failed..");
			return null;
		}
	});
}



function removefromQB(QB1,result,res){
	var params={id:result.id};
 	QB1.users.delete(params,function(error, result){
 		if(error){
 			console.log(error);
 		}else{
 			res.send({response:"Failed User Creation"});
 		}
 	});
}

exports.addQuestion=function(req,res){
	sess=req.session;
	console.log(sess);
	var result=validateHeader(req);
	if(result=='Visitor'){
		console.log(req.body);
		var roomid=req.body.roomid;
		var user_id=req.body.user_id;
		Room.update({_id:req.body.roomid},{$set:{questionare:req.body.Questions,updated_date:Date.now(),severity:req.body.severity}},function(err){
			if(err){
				console.log(err);
				res.send({response:"Questionaire Adding Failed."});
			}else{
				res.send({response:"Room Updated Succesfully."});
			}
		});
	}else{
		res.send({response:"Not A valid User./session expired"});
	}
};


exports.getRooms=function(req,res){
	sess=req.session;
	var result=validateHeader(req);
	if(result=='Provider' ){
		Room.find({status:'open'}, null, {sort: {created_on: -1}},function(err,rooms){
			if(err){
				console.log(err);
				res.send({response:"error in fetching rooms"});
			}else if(rooms){ 
				res.send(rooms);
			}else{
				res.send({response:"error in fetching rooms"});
			}
		});
		
	}else{
		res.send({response:"Not a valid user/Your Session is expired..."});
	}
}


exports.logOut=function(req,res){
	req.session.destroy();
	res.send({response:"logged Out"});
}

function validateHeader(req){
	console.log(req.headers);
	var authString=req.headers.auth;
	console.log(authString);
	if(authString!=null && authString !=''){
		var buffer=new Buffer(authString, 'base64');
		var userString=buffer.toString('ascii');
		console.log(userString);
		var userobj=JSON.parse(userString);
		var cr_time=userobj.ts;
		console.log(cr_time);
		if(userobj){
			return userobj.role;
		}else{
			return false;
		}
	}else{
		return false;
	}
}


exports.getRoom=function(req,res){
	var result=validateHeader(req);
	if(result=='Provider' ){
		Room.find({_id:req.body.roomid}, null, {sort: {created_on: -1}},function(err,rooms){
			if(err){
				console.log(err);
				res.send({response:"error in fetching rooms"});
			}else if(rooms){ 
				res.send(rooms[0]);
			}else{
				res.send({response:"error in fetching rooms"});
			}
		});
		
	}else{
		res.send({response:"Not a valid user/Your Session is expired..."});
	}
}

exports.addCalle=function(req,res){
	var result=validateHeader(req);
	if(result=='Provider' ){
		console.log(req.body);
		var roomid=req.body.roomid;
		var user_id=req.body.callies;
		Room.update({_id:req.body.roomid},{$addToSet:{users:user_id}},function(err){
			if(err){
				console.log(err);
				res.send({response:"callee Adding Failed."});
			}else{
				Room.find({_id:req.body.roomid}, null, {sort: {created_on: -1}},function(err,rooms){
					if(err){
						console.log(err);
						res.send({response:"error in fetching rooms"});
					}else if(rooms){ 
						res.send(rooms[0]);
					}else{
						res.send({response:"error in fetching rooms"});
					}
				});
			}
		});
		
	}else{
		res.send({response:"Not a valid user/Your Session is expired..."});
	}
}
