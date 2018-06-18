var express = require('express');
var router = express.Router();
var Users = require('../../utils/db/modules/users');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');

var {setTimeDir} = require('../../utils/func');
var config = require('../../config/config');

router.route('/upload').post(multipartMiddleware, function (req, res, next) {
  var timeDir = setTimeDir();
  var tmp = {
    path: req.files.file.path,
    name: req.files.file.path.slice(req.files.file.path.lastIndexOf('/') + 1)
  };

  var target = {
    dir: '../public/uploads/' + timeDir,
    path: '../public/uploads/' + timeDir + '/' + tmp.name,
    url: config.duty.webHost + '/api/uploads/' + timeDir + '/' + tmp.name
  };

  if (!fs.existsSync(target.dir)) {
    fs.mkdirSync(target.dir);
  }

  fs.rename(tmp.path, target.path, function (err) {
    if (err) throw err;
    // 删除临时文件夹文件,
    fs.unlink(tmp.path, function () {
      if (err) throw err;

      res.send(target.url)
    });
  });

});

router.route('/avatar').post(multipartMiddleware, function (req, res, next) {
  var timeDir = setTimeDir();
  var tmp = {
    path: req.files.file.path,
    name: req.files.file.path.slice(req.files.file.path.lastIndexOf('/') + 1)
  };

  var target = {
    dir: '../public/uploads/' + timeDir,
    path: '../public/uploads/' + timeDir + '/' + tmp.name,
    url: config.duty.webHost + '/api/uploads/' + timeDir + '/' + tmp.name
  };

  if (!fs.existsSync(target.dir)) {
    fs.mkdirSync(target.dir);
  }

  fs.rename(tmp.path, target.path, function (err) {
    if (err) throw err;
    // 删除临时文件夹文件,
    fs.unlink(tmp.path, function () {
      if (err) throw err;

      Users.findById(req.body.id, function (err, user) {
        if (err) throw err;

        user.avatar = target.url;

        user.save(function (err, user) { //保存用户信息到数据库
          if (err) throw err;

          res.send({
            success: true,
            msg: '上传成功',
            data: user
          });
        });
      });
    });
  });

});

router.route('/gallery').post(multipartMiddleware, function (req, res, next) {
  var timeDir = setTimeDir();
  var tmp = {
    path: req.files.file.path,
    name: req.files.file.path.slice(req.files.file.path.lastIndexOf('/') + 1)
  };

  var target = {
    dir: '../public/uploads/' + timeDir,
    path: '../public/uploads/' + timeDir + '/' + tmp.name,
    url: config.duty.webHost + '/api/uploads/' + timeDir + '/' + tmp.name
  };

  if (!fs.existsSync(target.dir)) {
    fs.mkdirSync(target.dir);
  }

  fs.rename(tmp.path, target.path, function (err) {
    if (err) throw err;
    // 删除临时文件夹文件,
    fs.unlink(tmp.path, function () {
      if (err) throw err;

      Users.findById(req.body.id, function (err, user) {
        if (err) throw err;

        user.gallery.push(target.url);

        user.save(function (err, user) { //保存用户信息到数据库
          if (err) throw err;

          res.send({
            success: true,
            msg: '上传成功',
            data: user
          });
        });
      });
    });
  });

});


module.exports = router;
