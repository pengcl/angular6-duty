var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Orders = require('../../utils/db/modules/orders');


router.get('/find', function (req, res, next) {
  if (req.query.id && !req.query.uid) {
    console.log('!uid && id');
    Orders.findById(req.query.id, function (err, order) {
      res.send(order);
    });
  }
  if (req.query.uid && !req.query.id) {
    console.log('uid && !id');
    Orders.findByOwner(req.query.uid, function (err, orders) {
      res.send(orders);
    });

  }
  if (!req.query.id && !req.query.uid) {
    console.log('!uid && !id');
    Orders.findAll(function (err, orders) {
      res.send(orders);
    });
  }
});

router.route('/submit').post(multipartMiddleware, function (req, res, next) {
  const order = new Orders(req.body);

  order.save(function (err, order) { //保存订单信息到数据库
    if (err) throw err;

    res.send({
      success: true,
      msg: '下单成功',
      data: order
    });
  });
});

router.route('/setStatus').post(multipartMiddleware, function (req, res, next) {

  Orders.findByIdAndUpdate(req.body.id, {status: req.body.status}, function (err, order) {
    if (err) throw err;

    res.send({
      success: true,
      msg: '下单成功',
      data: order
    });
  })
});

module.exports = router;
