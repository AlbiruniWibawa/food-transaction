'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Transaction.belongsTo(models.Food, { foreignKey: 'food_id' });
      // define association here
    }
  }
  Transaction.init({
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions',
  });
  return Transaction;
};