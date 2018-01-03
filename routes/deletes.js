var express = require('express');

var mongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = "mongodb://127.0.0.1:27017/nodeProject";

var async = require('async');

var router = express.Router();

router.get('/deletes', function(req, res){
    var goodsId = parseInt(req.query.uid);
	//定义函数表达式，用于操作数据库并返回结果
	var findData = function(db, callback) {
    //获得指定的集合
    var conn = db.collection('project');
    //要删除数据的条件，_id>2的用户删除
    conn.remove({uid:goodsId},function(err, result) {
        //如果存在错误
        if(err)
        {
            console.log('Error:'+ err);
            // return;
        }else{
        callback(result);
        }
        //调用传入的回调方法，将操作结果返回
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

        console.log(result);
        //关闭数据库
        db.close();
    });
});

})


module.exports = router;