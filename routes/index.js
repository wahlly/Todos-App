const todoRoutes = require('./todoRoutes');
const frontendTodoRoutes = require('../routes/frontendRoutes');
const { requireLogin } = require('../middlewares/auth');
const authRoutes = require('./userAuthRoutes')

module.exports = (app) => {

    app.use('/auth', authRoutes)

    app.use('/api/v1/', todoRoutes);

    app.use('/todos', frontendTodoRoutes);
};