wechat = require('node-wechat')('yuanzm');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	wechat.checkSignature(req, res);
	wechat.handler(req, res);

	//监听文本信息
	  wechat.text(function (data) {

	    console.log(data.ToUserName);
	    //console.log(data.FromUserName);
	    //console.log(data.CreateTime);
	    //console.log(data.MsgType);
	    //...

	    var msg = {
	      FromUserName : data.ToUserName,
	      ToUserName : data.FromUserName,
	      //MsgType : "music",
	      Title : "宋冬野",
	      Description : "宋冬野——摩登天空7",
	      MusicUrl : "http://zhangmenshiting.baidu.com/data2/music/71272862/44897031226800128.mp3?xcode=8c25fcb0e8157c1d4ee014e7c541cba8c3b34145ef4199ad",
	      //HQMusicUrl : "http://zhangmenshiting.baidu.com/data2/music/71272862/44897031226800128.mp3?xcode=8c25fcb0e8157c1d4ee014e7c541cba8c3b34145ef4199ad",
	      //FuncFlag : 0
	    }

	    //回复信息
	    wechat.send(msg);
	  });

	
});

module.exports = router;
