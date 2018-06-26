var express = require('express');
var router = express.Router();

var Users = require('../../utils/db/modules/users');//导入模型数据模块

/* GET users listing. */

router.get('/find', function (req, res, next) {
  if (req.query.id) {
    Users.findById(req.query.id, function (err, user) {
      res.send(user);
    })
  } else {
    Users.findAll(function (err, users) {
      res.send(users)
    })
  }
});

module.exports = router;
