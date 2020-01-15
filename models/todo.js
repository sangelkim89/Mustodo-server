<<<<<<< HEAD
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
  };
  return Todo;
=======
'use strict';

module.exports = (sequelize, DataTypes) => {
	const Todo = sequelize.define(
		'Todo',
		{
			todoid: {
				type: Sequelize.INTEGER,
				references: 'User', // <<< Note, its table's name, not object name
				referencesKey: 'id' // <<< Note, its a column name
			},

			todoitem: DataTypes.STRING,
			status: DataTypes.STRING
		},
		{}
	);
	Todo.associate = function(models) {
		// associations can be defined here
		Todo.belongsTo(models.User, {
			foreignKey: 'id'
		});
	};
	return Todo;
>>>>>>> ff75f174ca709fa19964dca985490a0ca13f1011
};
