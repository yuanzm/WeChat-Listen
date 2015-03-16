var express = require('express');
var router = express.Router();

var weixin = require('weixin-api');

/* GET home page. */
router.get('/service', function(req, res, next) {
    if (weixin.checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

weixin.token = 'yuanzm';
// 监听文本消息
weixin.textMsg(function(msg) {
    console.log("textMsg received");
    console.log(JSON.stringify(msg));

    var resMsg = {};

    switch (msg.content) {
        case "文本" :
            // 返回文本消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "这是文本回复",
                funcFlag : 0
            };
            break;

        case "音乐" :
            // 返回音乐消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "music",
                title : "音乐标题",
                description : "音乐描述",
                musicUrl : "音乐url",
                HQMusicUrl : "高质量音乐url",
                funcFlag : 0
            };
            break;

        case "图文" :

            var articles = [];
            articles[0] = {
                title : "PHP依赖管理工具Composer入门",
                description : "PHP依赖管理工具Composer入门",
                picUrl : "http://weizhifeng.net/images/tech/composer.png",
                url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
            };

            articles[1] = {
                title : "八月西湖",
                description : "八月西湖",
                picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
                url : "http://weizhifeng.net/bayuexihu.html"
            };

            articles[2] = {
                title : "「翻译」Redis协议",
                description : "「翻译」Redis协议",
                picUrl : "http://weizhifeng.net/images/tech/redis.png",
                url : "http://weizhifeng.net/redis-protocol.html"
            };

            // 返回图文消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : articles,
                funcFlag : 0
            }
    }

    weixin.sendMsg(resMsg);
});

router.post('/service', function(req, res) {
	weixin.loop(req, res);
})

module.exports = router;
