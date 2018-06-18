var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Orders = require('../../utils/db/modules/orders');

router.route('/submit').post(multipartMiddleware, function (req, res, next) {
  console.log(req.body);
  const order = new Orders(req.body);

  order.save(function (err, order) { //保存用户信息到数据库
    if (err) throw err;

    res.send({
      success: true,
      msg: '下单成功',
      data: order
    });
  });
});

module.exports = router;
