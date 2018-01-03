var express = require('express');

var mongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = "mongodb://127.0.0.1:27017/nodeProject";

var async = require('async');

var router = express.Router();


// 评论操作
router.post('/save', function(req, res){
	var updateData = function(db, callback){
		var conn = db.collection('comment'),
			ids = db.collection('ids');
	async.waterfall([function(callback){
		ids.findAndModify({name : 'comment'}, [["_id", "desc"]], {$inc:{id:1}}, function(err, result){
			if(err){
				console.log(err);
			}else{
				callback(null, result.value.id);
			}
		})
	},function(id, callback){
		var data = [{uid : id, title : req.body.title, content : req.body.content}];
		console.log(data);
		conn.insert(data, function(result){
			callback(result);
		})
	}], function(err, result){
		if(err){
			console.log(err);
		}else{
			callback(result);
		}
	})
	}

	// 连接数据库
	mongoClient.connect(DB_CONN_STR, function(err, db){
		if(err){
			console.log(err);
		}else{
			updateData(db, function(callback){
				res.redirect('/comment/list');
				db.close()
			})
		}
	});
})


router.get("/list", function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*"); // 跨域响应头
	var findData = function(db, callback){
		var conn = db.collection("comment");
		conn.find({}).toArray(function(err, result){
			// console.log(result);
			if(err){
				console.log(err);
			}else{
				callback(result);
			}
		})
	}


	mongoClient.connect(DB_CONN_STR, function(err, db){
		if(err){
			res.send("失败");
		}else{
			// console.log(result);
			// res.send("查询ok")
			findData(db, function(result){
				res.render("list", {res:result});
				// res.send(result);
			})
		}
	})
})


router.get("/detail", function(req, res){
		var goodsId = parseInt(req.query.uid);
		console.log(goodsId);
		mongoClient.connect(DB_CONN_STR, function(err, db){
				var conn = db.collection("comment");
				conn.find({uid:goodsId}).toArray(function(err, result){
					res.render("detail", {res:result});
				})
		})
	})

	router.get('/deletes', function(req, res){
    var goodsId = parseInt(req.query.uid);
	//定义函数表达式，用于操作数据库并返回结果
	var findData = function(db, callback) {
    //获得指定的集合
    var conn = db.collection('comment');
    //要删除数据的条件，_id>2的用户删除
    conn.remove({uid:goodsId},function(result) {
    	console.log(result)
        callback(result);
    });
}

//使用客户端连接数据，并指定完成时的回调方法
mongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    //执行插入数据操作，调用自定义方法
    findData(db, function(result) {
        //显示结果
        res.render('list',{res:result});
        res.redirect('/comment/list');
        //关闭数据库
        db.close();
    });
});

})
module.exports = router;
