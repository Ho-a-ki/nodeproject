const express = require('express');
const indexRouter = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err)
})

// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트에서 대기중');
//   });

app.listen(8000, '0.0.0.0');