var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {
    res.send(res.render('signup'));
});
// user  signup
router.post('/', checkNotLogin, function(req, res, next) {
    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.fields.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    // check params
    try {
        if (!(name.length > 1 && name.length < 10)) {
            throw new Error('Name must be set upto 1-10 chars');
        }
        if (['m','f','x'].indexOf(gender) === -1) {
            throw new Error('Gender be set m,f,or x');
        }
        if (!(bio.length > 1 && bio.length <= 30)) {
            throw new Error("Profile set in 1-30 chars");
        }
        if (!req.files.avatar.name) {
            throw new Error("Miss photo");
        }
        if (password.length < 6) {
            throw new Error("Password at least 6 chars");
        }
        if (!password !== repassword) {
            throw new Error("Password not consistent");
        }
    } catch(e) {
        req.flash('error', e.message);
        return res.render('/signup');
    }

    password = sha1(password);

    //待写入数据库的用户信息
    var user = {
        name: name,
        gender: gender,
        password: password,
        bio: bio,
        avatar: avatar
    };

    //用户信息写入数据库
    UserModel.create(user)
        .then(function(result) {
            user = result.ops[0]; //user 是插入mongodb后的值,包含_id
            //将用户信息存入session
            delete user.password;
            req.session.user = user;
            //写入flash
            req.flash('success', 'Sign up successfully');
            res.redirect('/posts');
        })
        .catch(function (e) {
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error','用户名已被占用');
                return res.redirect('/signup');
            }
            next(e);
        });
});

module.exports = router;
