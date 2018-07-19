var express = require('express');
var request = require('request');
var router = express.Router();
var config = require('../../config/config');

var Trade = require('../../utils/db/modules/trade');

var {WxSvc} = require('../../utils/service/wx.js');
var util = require('../../utils/util');

var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

router.route('/pay').post(function (req, res, next) {
  const nonceStr = createNonceStr();
  // body = util.buildXML(req.body);

  body = '<xml>' +
    '<appid>' + config.duty.appID + '</appid>' +
    '<mch_id>' + config.duty.mch_id + '</mch_id>' +
    '<body>' + req.body.body + '</body>' +
    '<nonce_str>' + nonceStr + '</nonce_str>' +
    '<notify_url>' + config.duty.notify_url + '</notify_url>' +
    '<openid>' + req.body.openid + '</openid>' +
    '<out_trade_no>' + req.body.out_trade_no + '</out_trade_no>' +
    '<spbill_create_ip>113.111.49.18</spbill_create_ip>' +
    '<total_fee>' + req.body.total_fee + '</total_fee>' +
    '<trade_type>JSAPI</trade_type>' +
    '<sign>' + WxSvc.paySign({
      appid: config.duty.appID,
      mch_id: config.duty.mch_id,
      body: req.body.body,
      nonce_str: nonceStr,
      notify_url: config.duty.notify_url,
      openid: req.body.openid,
      out_trade_no: req.body.out_trade_no,
      spbill_create_ip: '113.111.49.18',
      total_fee: req.body.total_fee,
      trade_type: 'JSAPI'
    }) + '</sign>' +
    '</xml>';
  console.log(body);
  request({
    url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    method: 'POST',
    body: body
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {//请求成功
      util.parseXML(body, function (err, data) {
        var reqparam = {
          appId: config.duty.appID,
          timeStamp: Math.floor(Date.now() / 1000) + "",
          nonceStr: data.nonce_str,
          package: "prepay_id=" + data.prepay_id,
          signType: "MD5"
        };
        reqparam.paySign = WxSvc.paySign(reqparam);
        res.send(reqparam);
      });
    } else {
      res.send(new Error(error));
    }
  });
});

module.exports = router;
