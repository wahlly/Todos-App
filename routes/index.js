const todoRoutes = require('./todoRoutes');
const frontendTodoRoutes = require('../routes/frontendRoutes');

module.exports = (app) => {
    app.use('/api/v1/todos', todoRoutes);

    app.use('/todos', frontendTodoRoutes);
};