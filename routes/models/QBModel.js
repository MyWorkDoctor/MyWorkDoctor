/**
 * New node file
 */
var QB1=require("quickblox");
var config=require('../config.server.js');
QB1.init(config.quickBlox.appid,config.quickBlox.auth_key,config.quickBlox.secret_key);
QB1.createSession(function(err, result) {
	  if (err) { 
	    console.log('Something went wrong: ' + err);
	  } else {
	    console.log('Session created with id ' + result.id);
	  }
	});
module.exports=QB1;