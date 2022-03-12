const createError = require('http-errors');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbService = require('./services/dbService');
const RagisterUserRouter = require('./routes/User')
const UserDetailRouter = require('./routes/User')
const UpdateUserDetailRouter = require('./routes/User')
const DeleteUserDetailRouter = require('./routes/User')

const SignUpRouter = require('./routes/User')
const LoginRouter = require('./routes/User')

dbService().startDev();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000,
	})
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/amit', RagisterUserRouter);
app.use('/api/amit', UserDetailRouter);
app.use('/api/amit', UpdateUserDetailRouter);
app.use('/api/amit', DeleteUserDetailRouter);

//Public and Priate API Of Login
app.use('/api/publicapi', SignUpRouter);
app.use('/api/privateapi', LoginRouter);
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

