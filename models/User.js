const DataTypes = require('sequelize/lib/data-types');
const database = require('../config/database');

const hooks = {
	beforeCreate() {},
};

const AmitPandey = database.define(
	'AmitPandey',
	{
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'AMIT_PANDEY',
		hooks,
	}
);
//AmitPandey.sync({alter:true})

module.exports = AmitPandey;

