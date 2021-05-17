const Sequelize = require('sequelize');
const configs = require('../../configs/configs.json');
const Todos = require('./todos');

const sequelize = new Sequelize(configs.mysql.options);

sequelize
    .authenticate()
    .then(() => {
        console.log('mysql is connected successfully')
    })
    .catch(err => {
        console.error('unable to connect to mysql', err)
    })

let db = {}
db['todos'] = Todos(sequelize, Sequelize.DataTypes);

module.exports = db.todos;