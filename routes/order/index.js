var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Orders = require('../../utils/db/modules/orders');


router.get('/find', function (req, res, next) {
  if (req.query.id && !req.query.uid) {
    Orders.findById(req.query.id, function (err, order) {
      res.send(order);
    });
  }
  if (req.query.uid && !req.query.id) {
    Orders.findByOwner(req.query.uid, function (err, orders) {
      res.send(orders);
    });
  }
  if (!req.query.id && !req.query.uid) {
    Orders.findAll(function (err, orders) {
      res.send(orders);
    });
  }
});

router.route('/submit').post(multipartMiddleware, function (req, res, next) {
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
