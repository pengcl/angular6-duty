var express = require('express');
var router = express.Router();

var Users = require('../../utils/db/modules/users');//导入模型数据模块
var Messages = require('../../utils/db/modules/messages');

/* GET users listing. */

function checkPwd() {
}

router.route('/signUp').post(function (req, res, next) {
  if (req.body.username && req.body.password) {
    Users.findBySomething(req.body.username, function (err, user) {
      if (err) {
        console.log(err);
        return err;
      } else {
        if (!user) {//如果数据库不存在此mobile的用户
          var user = new Users({
            username: req.body.username,
            password: req.body.password,
            wx: {},
            access_token: {}
          });

          user.save(function (err, user) { //保存用户信息到数据库
            if (err) {
              return;
            } else {//user信息插入成功

              var messages = new Messages({
                uid: user._id,
                title: '欢迎加入度特',
                content: '度特欢迎您的加入，期待您能创造价值！'
              });

              messages.save(function (err, message) {
                console.log(err, message);
                if (err) throw err;
              });

              res.send({
                success: true,
                msg: '度特欢迎您的加入，期待您能创造价值！',
                result: user._id
              });
            }
          });
        } else {//如果数据库存在此mobile的用户
          res.send({
            success: false,
            msg: '用户已经存在',
            result: ''
          });
        }
      }
    });
  } else {
    res.send({
      success: false,
      msg: '缺少参数',
      result: ''
    });
  }
});

router.route('/signIn').post(function (req, res, next) {
  if (req.body.username && req.body.password) {
    Users.findBySomething(req.body.username, function (err, user) {//通过openid获取数据库用户信息
      if (err) {
        console.log(err);
      } else {
        if (!user) {//用户不存在
          res.send({
            success: false,
            msg: '登录用户不存在,请重新登录!',
            result: ''
          });
        } else {//如果数据库存在此mobile的用户
          if (req.body.password === user.password) {
            res.send({
              success: true,
              msg: '度特欢迎您的登录，期待您能创造价值！',
              result: user._id
            });
          } else {
            res.send({
              success: false,
              msg: '登录失败，用户名或密码不正确！',
              result: user._id
            });
          }
        }
      }
    });
  } else {
    res.send({
      success: false,
      msg: '缺少参数',
      result: ''
    });
  }
});

/*router.route('/setting').post(function (req, res, next) {

  Users.findByIdAndUpdate(req.body.id, {$set: req.body}, {new: true}, function (err, user) {
    if (err) return handleError(err);
    res.send({
      success: true,
      msg: '信息提交成功',
      data: user
    });
  });

});*/

module.exports = router;
