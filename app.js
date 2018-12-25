const express = require('express');
const path = require('path');
const morgan = require('morgan'); // logger api
const cookieParser = require('cookie-parser');
const session = require('express-session'); // 휘발성 mes api
const flash = require('connect-flash');
const axios = require('axios')
// const passport = require('passport') //passport 연결.
require('dotenv').config();

const indexRouter = require('./routes');

// const { sequelize } = require('./models') // mysql 연결
// const passportConfig = require('./passport')

const app = express();

// sequelize.sync()
// passportConfig(passport)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname,'public')))
app.set('port', process.env.PORT || 8000);

if (process.env.NODE_ENV ==='production') {
    app.use(morgan('combined'))
} else {
    app.use(morgan('dev'))
}

// NODE_ENV는 배포환경인지 개발환경인지 판단할 수 있는 환경변수

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET))

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}

if (process.env.NODE_ENV ==='production') {
    sessionOption.proxy = true;
}

app.use(session(sessionOption))
app.use(flash());

app.use('/', indexRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err)
})

app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500)
    res.render('error')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });