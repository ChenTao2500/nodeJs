var express = require('express');

var mongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = "mongodb://127.0.0.1:27017/nodeProject";

var async = require('async');

var router = express.Router();


router.get("/letes", function(req, res){
		var conn = db.collection("comment");
		var data = {"uid": 1};
		conn.remove(data, function(err, result){
			if(err){
				console.log(err);
			}else{
				 console.log(result.result.n);
			}
			db.close();
		})

	mongoClient.connect(DB_CONN_STR, function(err, db){
		if(err){
			res.send("失败");
		}else{
			console.log("连接成功");
			deleteData(db)
		}
	})
})


module.exports = router;


