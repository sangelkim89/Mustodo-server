'use strict';

module.exports = (sequelize, DataTypes) => {
	const Todo = sequelize.define(
		'Todo',
		{
			userid: DataTypes.NUMBER,
			todoid: DataTypes.NUMBER,
			todoitem: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{}
	);
	Todo.associate = function(models) {
		// associations can be defined here
		models.Todo.belongsTo(models.User, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: false,
				defaultValue: 1
			}
		});
	};
	return Todo;
};
