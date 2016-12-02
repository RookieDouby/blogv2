var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

var app = express();

app.set('views',path.join(__dirname, 'views'));//set directory of tempalte files
app.set('view engine', 'ejs');

//set static directory
app.use(express.static(path.join(__dirname, 'public')));

//session middleware
app.use(session({
    name: config.session.key, // 设置cookie中保存session id的字段名字
    secret: config.session.secret,//通过secret计算hash值保存在cookie中，使产生的signedCookie防篡改
    cookie: {
        maxAge: config.session.maxAge //过期时间
    },
    store: new MongoStore({ //将session 存到mongodb
        url: config.mongodb
    })
}));
//use flash middleware
app.use(flash());

//处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),//上传文件目录
    keepExtensions: true //保留后缀
}));

//set global CONST
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};
//add necessary variables
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString(),
    res.locals.error = req.flash('error').toString()
    next();
});
routes(app);

app.listen(config.port,function() {
    console.log(`${pkg.name} running at port: ${config.port}`);
});
