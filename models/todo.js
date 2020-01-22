'use strict';
module.exports = (sequelize, DataTypes) => {
	const Todo = sequelize.define(
		'Todo',
		{
			userid: DataTypes.STRING,
			todoid: DataTypes.STRING,
			todoitem: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{}
	);
	Todo.associate = function(models) {
		// associations can be defined here
	};
	return Todo;
};
