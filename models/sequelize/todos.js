const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class todos extends Model {};
        todos.init({
            uniqueId: DataTypes.STRING,
            description: DataTypes.STRING,
            isCompleted: DataTypes.BOOLEAN
        },
        {
        sequelize,
        modelName: 'todos'
        })
        return todos;
}