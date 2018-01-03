var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title : '首页',
  	title1: '欢迎来到首页~~~~~~',
  	username : req.session.username
  });
});

// 注册页面路由配置
router.get('/register', function(req, res){
	res.render('register', {
		title : '注册页',
		title1 : '欢迎来到注册页~~~~~~~'
	});
});

// 登陆页面路由配置
router.get('/login', function(req, res){
	res.render('login', {
		title : '登陆页',
		title1 : '欢迎来到登陆页~~~~~~'
	})
})

// 退出账户路由配置
router.get('/loginout', function(req, res){
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect('/');
		}
	})
})


// 评论也
router.get('/comment', function(req, res){
	res.render('comment', {
		title : '评论'
	});
})

// 列表
router.get('/list', function(req, res){
	res.render('list', {});
})
// 详情
router.get('/detail', function(req, res){
	res.render('detail', {
		title : '详情'
	});
})


router.get('/deletes', function(req, res){
	res.render('list', {
		title : '详情'
	});
})



module.exports = router;
