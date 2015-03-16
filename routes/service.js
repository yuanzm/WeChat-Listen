var express = require('express'),
	router = express.Router(),
	url = require('url'),
	crypto = require('crypto'),
	TOKEN = 'yuanzm';

/* GET home page. */
router.get('/', function(req, res, next) {
  	var reqObj = url.parse(req.url, true),
		params = reqObj['query'],
		signature = params['signature'],
		timestap = params['timestap'],
		nonce = params['nonce'],
		echostr = params['echostr'],
		tmpArr = [TOKEN, timestap, nonce];

	tmpArr.sort();
	var tmpStr = tmpArr.join('');
	var shaum = crypto.createHash('sha1');
	shaum.update(tmpStr);
	var shaResult = shaum.digest('hex');
	if (shaResult === signature) {
		res.send(echostr);
	} else {
		console.log('not weixin server');
		res.send('not weixin server');
	}
});

module.exports = router;
