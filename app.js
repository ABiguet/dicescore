import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import flash from 'express-flash';

import indexRouter from './src/routes/index.js';
import gameRouter from './src/routes/game.js';
import playerRouter from './src/routes/players.js';

const app = express();

app.use(
    session({
        secret: 'super-key-of-the-death',
        resave: true,
        saveUninitialized: true,
    }),
);
app.use(flash());

// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/', gameRouter);
app.use('/api/players', playerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
