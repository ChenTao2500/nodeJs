var express = require('express');

// 引入数据库资源
var mongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://127.0.0.1:27017/nodeProject";


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 注册操作起来
router.post('/save', function(req, res){
	// 打印注册信息  账号 + 密码
	console.log(req.body.registername);
	console.log(req.body.registerpsw);
	
	// 变量暂存账号和密码
	var username = req.body.registername,
		password = req.body.registerpsw,
		reregisterpsw = req.body.reregisterpsw;

	// 注册   --- 插入数据
	var insertData = function(db, callback){
		// 关联集合
		var data = [{username : username, password : password}];
		var conn = db.collection("project");
		conn.insert(data, function(err, result){
			if(err){
				console.log(err);
			}else{ // 成功
				callback(result);
			}
		})
	}

	//  连接数据库
	mongoClient.connect(DB_CONN_STR, function(err, db){
		if(err){ // 连接失败
			res.send('连接失败~~~');
		}else{ // 成功
			if(!username){
				res.send("亲，请输入账号哦~~~");
			}else{
				if(!password){
					res.send("亲，您忘了填写密码了哦~~");
				}else{
					if(!reregisterpsw){
						res.send("两次密码输入不一致~~")
					}else{
						insertData(db, function(result){
							// res.send('ok');
							res.redirect("/login"); // 跳转到登陆页
							db.close(); // 关闭数据库
						})
					}
				}
			}
		}
	})
});





// 登陆操作
router.all('/loginsave', function(req, res){ // 表单提交数据的方式是 post 不清楚的时候用 all

	var username = req.body.loginname,
		password = req.body.loginpsw;
	console.log(username, password);


	// 登陆操作 ---- 数据查询
	var findData = function(db,callback){
		// 关联集合
		var conn = db.collection("project"); // 集合
		var data = {username : username, password : password};
		console.log(data)
		conn.find(data).toArray(function(err, result){
			if(err){
				console.log(err);
			}else{ // 查找成功
				callback(result);
			}
		})
	}
	// 连接数据库
	mongoClient.connect(DB_CONN_STR, function(err,db){
		if(err){
			res.send("数据库连接失败")
		}else{ // 连接成功
			findData(db, function(result){
				console.log(result);
				if(result.length > 0){
					req.session.username = result[0].username;
					res.redirect('/');
					db.close();
				}else{
					res.send('失败')
				}
			})
		}
	});

});


















// 评论操作









// 列表操作





module.exports = router;