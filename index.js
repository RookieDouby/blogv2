var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.use('/',indexRouter);
app.use('/users',userRouter);

app.listen(3000,function() {
    console.log("Server running at port: 3000");
});