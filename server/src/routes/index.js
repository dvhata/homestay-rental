const aparmentsRouter = require('./aparments');
const usersRouter = require('./users');
const adminsRouter = require('./admins');
const authRouter = require('./auth');

function route(app) {
    app.use('/api/auth-token', authRouter);
    app.use('/api/apartments', aparmentsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/admins', adminsRouter);
}

module.exports = route;