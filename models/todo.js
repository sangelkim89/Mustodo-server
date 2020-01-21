"use strict";

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      todoid: DataTypes.STRING,
      todoitem: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Todo.associate = function(models) {
    // associations can be defined here
    // Todo.belongsTo(models.User, {
    //   foreignKey: "id"
    // });
  };
  return Todo;
};
